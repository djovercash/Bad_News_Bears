const App = (function() {

  return class App {

      static init() {
        console.log("I'm in app")
        App.postIdeas()
        let logIn = document.getElementById('logInInput')
        logIn.addEventListener("submit", function(event){
          event.preventDefault()
          let userLogIn = document.getElementById('logInUser').value
          App.findUser(userLogIn)
          let logInContainer = document.getElementById('preLogInContainer')
          logInContainer.remove()
        })
      }

      static postIdeas() {
        let ideasContainer = document.getElementById('newIdeaList')
        Adapter.getIdeas()
        .then(ideas => {
          let newAndUnfinished = ideas.filter(idea => {return idea.outcome.length === 1})
          newAndUnfinished.forEach(id => {
            let newIdea = new Idea(id)
            ideasContainer.append(newIdea.renderIdeas())

          })
        })
      }

      static findUser(userInput) {
        let userContainer = document.getElementById('postLogInContainer')
        let userIdeasContainer = document.getElementById('rightContainer')
        let login = document.getElementById('titleLogin')
        let ideasContainer = document.getElementById('newIdeaList')
        let chartBox = document.getElementById('pieChartDiv')
        let h2 = document.createElement('h2')
        h2.innerText = "Your Bad Ideas:"
        userIdeasContainer.append(h2)
        chartBox.innerHTML = " "
        Adapter.getUsers()
        .then(json => {
          let apiUser = json.find(user =>{return user.username === userInput})
          let currentUser = new User(apiUser)
          login.append(currentUser.renderUsername())
          userContainer.append(Idea.renderBadIdeaForm())
          ideasContainer.innerHTML = " "
          let voteContainer = document.getElementById('voteBox')
          voteContainer.innerHTML = " "
          Adapter.getIdeas()
          .then(json => {
            let notUserIdeas = json.filter(idea => {return idea.user_id !== currentUser.id && idea.outcome.length === 1})
            notUserIdeas.forEach(idea => {
              let nIdea = new Idea(idea)
              ideasContainer.append(nIdea.renderIdeas())
            })
          })
          Adapter.getIdeas()
          .then(json => {
            let ideas = json.filter(idea => {return idea.user_id === currentUser.id && idea.outcome.length === 1})
            ideas.forEach(idea => {
              let newIdea = new Idea(idea)
              userIdeasContainer.append(newIdea.renderUserIdeas())
            })
          })
        })
      }

      static createNewIdea(event, id) {
        event.preventDefault()
        let userIdeasContainer = document.getElementById('rightContainer')
        let ideaInput = document.getElementById('userNewIdea')
        let newIdea = document.getElementById('userNewIdea').value
        Adapter.createIdea(id, newIdea)
        .then(data => {
          let newIdea = new Idea(data)
          userIdeasContainer.append(newIdea.renderIdeas())
          ideaInput.value = " "
        })
      }

      static ideaDetails(event, id, userId) {
        event.preventDefault()
        let postLoginBox = document.getElementById('postLogInContainer')
        let userCheck = document.getElementById('titleLogin')
        let voteContainer = document.getElementById('voteBox')
        let chartBox = document.getElementById('pieChartDiv')
        let preLogInBox = document.getElementById('preLogInContainer')
        postLoginBox.innerHTML= " "
        voteContainer.innerHTML = " "
        chartBox.innerHTML = " "
        Adapter.getIdeas()
        .then(data => {
          let selectedIdea = data.find(idea => {return idea.id === id})
          let fullIdea = new Idea(selectedIdea)
          if (userCheck.childNodes.length === 4) {
            let user = parseInt(userCheck.childNodes[3].getAttribute('data-id'))
            if (user === fullIdea.user_id){
              chartBox.innerHTML = `<canvas id="pieChart" width="200" height="200"></canvas>`
              voteContainer.append(fullIdea.badIdeaRenderFull())
            } else {
              chartBox.innerHTML = `<canvas id="pieChart" width="200" height="200"></canvas>`
              voteContainer.append(fullIdea.badIdeaVoteRenderObserver())
            }
          } else {
            preLogInBox.innerHTML = " "
            chartBox.innerHTML = `<canvas id="pieChart" width="200" height="200"></canvas>`
            voteContainer.append(fullIdea.badIdeaVoteRenderObserverNonUser())
          }
        })
      }

      static goodBadIdea(event, id, feeling) {
        event.preventDefault()
        let choice = document.getElementById('choiceMaker')
        choice.innerHTML = " "
        let form = App.renderResponse(id, feeling)
        choice.append(form)
      }

      static renderResponse(id, feeling) {
        let div = document.createElement('div')
        let h4 = document.createElement('h4')
        h4.innerText = "Share Your Experience:"
        let textarea = document.createElement('textarea')
        let lineBreak = document.createElement('br')
        let button = document.createElement('button')
        button.innerText = "Submit"
        button.setAttribute("onclick", `App.sendResponse(event, ${id}, ${feeling})`)
        div.append(h4)
        h4.append(lineBreak)
        div.append(textarea)
        div.append(lineBreak)
        div.append(button)
        return div
      }

      static sendResponse(event, id, feeling) {
        event.preventDefault()
        let outcome = document.getElementById('choiceMaker')
        let outcomeResponse = outcome.childNodes[1]
        let response = outcomeResponse.childNodes[1].value
        Adapter.updateOutcome(id, feeling, response)
        let voteBox = document.getElementById('voteBox')
        let pieChart = document.getElementById('pieChart')
        let smallOption = document.getElementById(`User Idea:${id}`)
        let pieChartBox = document.getElementById('pieChartDiv')
        let userContainer = document.getElementById('postLogInContainer')
        pieChartBox.innerHTML = " "
        pieChart.remove()
        smallOption.remove()
        voteBox.innerHTML = " "
        userContainer.append(Idea.renderBadIdeaForm())
      }

      static updatedDoItCount(event, id, count) {
        event.preventDefault()
        let div = document.getElementById('pieChartDiv')
        let vote = document.getElementById('voteBox')
        vote.innerHTML = " "
        div.innerHTML = " "
        div.innerHTML = `<canvas id="pieChart" width="200" height="200"></canvas>`
        let chart = document.getElementById('pieChart')
        chart.setAttribute("onclick", `App.removeChart()`)
        let newCount = count + 1
        Adapter.updatedDoItCount(id, newCount)
        .then(data => {
          let stats = []
          let h4 = document.createElement('h4')
          h4.innerText = `Thanks for your vote`
          vote.append(h4)
          vote.setAttribute("onclick", `App.removeChart()`)
          stats.push(data.do_it)
          stats.push(data.dont_do_it)
          let chx = new Chart(chart, {
            type: 'doughnut',
            data: {
              labels: ["Do It!", "Don't Do It!"],
              datasets: [{
                label: 'Number of Votes',
                data: stats,
                backgroundColor: [
                  'rgba(0, 0, 0, 0.7)',
                  'rgba(255, 69, 0, 0.7)'
                ],
                borderColor: [
                  'rgb(192, 192, 192)',
                  'rgb(192, 192, 192)'
                ]
              }]
            },
            options: {
              legend: {
                labels: {
                  fontColor: 'white'
                }
              }
            }
          })
        })
      }

      static updatedDoItCountNonUser(event, id, count) {
        event.preventDefault()
        let div = document.getElementById('pieChartDiv')
        let vote = document.getElementById('voteBox')
        vote.innerHTML = " "
        div.innerHTML = " "
        div.innerHTML = `<canvas id="pieChart" width="200" height="200"></canvas>`
        let chart = document.getElementById('pieChart')
        chart.setAttribute("onclick", `App.removeChartNonUser()`)
        let newCount = count + 1
        Adapter.updatedDoItCount(id, newCount)
        .then(data => {
          let stats = []
          let h4 = document.createElement('h4')
          h4.innerText = `Thanks for your vote`
          vote.append(h4)
          vote.setAttribute("onclick", `App.removeChartNonUser()`)
          stats.push(data.do_it)
          stats.push(data.dont_do_it)
          let chx = new Chart(chart, {
            type: 'doughnut',
            data: {
              labels: ["Do It!", "Don't Do It!"],
              datasets: [{
                label: 'Number of Votes',
                data: stats,
                backgroundColor: [
                  'rgba(0, 0, 0, 0.7)',
                  'rgba(255, 69, 0, 0.7)'
                ],
                borderColor: [
                  'rgb(192, 192, 192)',
                  'rgb(192, 192, 192)'
                ]
              }]
            },
            options: {
              legend: {
                labels: {
                  fontColor: 'white'
                }
              }
            }
          })
        })
      }

      static updatedDontDoItCount(event, id, count) {
        event.preventDefault()
        let div = document.getElementById('pieChartDiv')
        let vote = document.getElementById('voteBox')
        vote.innerHTML = " "
        div.innerHTML = " "
        div.innerHTML = `<canvas id="pieChart" width="200" height="200"></canvas>`
        let chart = document.getElementById('pieChart')
        let newCount = count + 1
        Adapter.updatedDontDoItCount(id, newCount)
        .then(data => {
          let stats = []
          let h4 = document.createElement('h4')
          h4.innerText = `Thanks for your vote`
          vote.append(h4)
          vote.setAttribute("onclick", `App.removeChart()`)
          chart.setAttribute("onclick", `App.removeChart()`)
          stats.push(data.do_it)
          stats.push(data.dont_do_it)
          let chx = new Chart(chart, {
            type: 'doughnut',
            data: {
              labels: ["Do It!", "Don't Do It!"],
              datasets: [{
                label: 'Number of Votes',
                data: stats,
                backgroundColor: [
                  'rgba(0, 0, 0, 0.7)',
                  'rgba(255, 69, 0, 0.7)'
                ],
                borderColor: [
                  'rgb(192, 192, 192)',
                  'rgb(192, 192, 192)'
                ]
              }]
            },
            options: {
              legend: {
                labels: {
                  fontColor: 'white'
                }
              }
            }
          })
        })
      }

      static updatedDontDoItCountNonUser(event, id, count) {
        event.preventDefault()
        let div = document.getElementById('pieChartDiv')
        let vote = document.getElementById('voteBox')
        vote.innerHTML = " "
        div.innerHTML = " "
        div.innerHTML = `<canvas id="pieChart" width="200" height="200"></canvas>`
        let chart = document.getElementById('pieChart')
        let newCount = count + 1
        Adapter.updatedDontDoItCount(id, newCount)
        .then(data => {
          let stats = []
          let h4 = document.createElement('h4')
          h4.innerText = `Thanks for your vote`
          vote.append(h4)
          vote.setAttribute("onclick", `App.removeChartNonUser()`)
          chart.setAttribute("onclick", `App.removeChartNonUser()`)
          stats.push(data.do_it)
          stats.push(data.dont_do_it)
          let chx = new Chart(chart, {
            type: 'doughnut',
            data: {
              labels: ["Do It!", "Don't Do It!"],
              datasets: [{
                label: 'Number of Votes',
                data: stats,
                backgroundColor: [
                  'rgba(0, 0, 0, 0.7)',
                  'rgba(255, 69, 0, 0.7)'
                ],
                borderColor: [
                  'rgb(192, 192, 192)',
                  'rgb(192, 192, 192)'
                ]
              }]
            },
            options: {
              legend: {
                labels: {
                  fontColor: 'white'
                }
              }
            }
          })
        })
      }

      static removeChart() {
        let div = document.getElementById('pieChartDiv')
        let vote = document.getElementById('voteBox')
        let userContainer = document.getElementById('postLogInContainer')
        userContainer.append(Idea.renderBadIdeaForm())
        vote.innerHTML = " "
        div.innerHTML = " "
        div.innerHTML = `<canvas id="pieChart" width="200" height="200"></canvas>`
      }

      static removeChartNonUser() {
        location.reload()

      }

      static deleteIdea(event, id) {
        event.preventDefault()
        let box = document.getElementById('voteBox')
        let mini = document.getElementById(`User Idea:${id}`)
        Adapter.deleteIdea(id)
        voteBox.remove()
        mini.remove()
      }

      static logOut() {
        location.reload()
      }
  }
})();
