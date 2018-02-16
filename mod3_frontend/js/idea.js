const Idea = (function() {

  return class Idea {
    constructor(json) {
      this.id = json.id
      this.user_id = json.user_id
      this.description = json.description
      this.do_it_count = json.do_it
      this.dont_do_it_count = json.dont_do_it
      this.outcome = json.outcome
      this.good = json.good
      this.image_url = json.url
    }


    renderIdeas() {
      let ul = document.createElement('ul')
      let li = document.createElement('li')
      let length = 20
      let title = this.description
      let ending = "..."
      li.setAttribute("id", `User Idea:${this.id}`)
      li.setAttribute("onclick", `App.ideaDetails(event, ${this.id}, ${this.user_id})`)
      if (title.length > length) {
        li.innerText = title.substring(0, length,) + ending
      } else {
        li.innerText = title
      }
      ul.append(li)
      return ul
    }

    renderUserIdeas() {
      let div = document.createElement('div')
      let ul = document.createElement('ul')
      let li = document.createElement('li')
      let length = 20
      let title = this.description
      let ending = "..."
      if (title.length > length) {
        li.innerText = title.substring(0, length,) + ending
      } else {
        li.innerText = title
      }
      li.setAttribute("id", `User Idea:${this.id}`)
      li.setAttribute("onclick", `App.ideaDetails(event, ${this.id}, ${this.user_id})`)
      ul.append(li)
      div.append(ul)
      return div
    }

    static renderBadIdeaForm() {
      let form = document.createElement("form")
      let h2 = document.createElement("h2")
      let input = document.createElement("input")
      let submitInput = document.createElement("input")
      let lBreak = document.createElement("br")
      let lBreak2 = document.createElement("br")
      let user = document.getElementById('userId')
      let userId = user.getAttribute("data-id")
      form.setAttribute("id", "newIdeaForm")
      submitInput.setAttribute("onclick", `App.createNewIdea(event, ${userId})`)
      h2.innerText = "What's Your Next Bad Idea?"
      input.setAttribute("id", "userNewIdea")
      submitInput.setAttribute("type", "submit")
      submitInput.setAttribute("value", "Bad Idea")
      form.append(h2)
      h2.append(lBreak)
      form.append(input)
      form.append(lBreak2)
      form.append(submitInput)
      return form
    }

    badIdeaVoteRenderObserver() {
      let div = document.createElement('div')
      let h3 = document.createElement("h3")
      h3.innerText = `Vote On ${this.description}`
      let lineBreak = document.createElement("br")
      let goodButton = document.createElement("button")
      let badButton = document.createElement("button")
      let chart = document.getElementById('pieChart')
      chart.setAttribute("onclick", `App.removeChart()`)
      let stats = [this.do_it_count, this.dont_do_it_count]
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
      goodButton.setAttribute("value", "do_it")
      badButton.setAttribute("value", "dont_do_it")
      goodButton.innerText = "DO IT!"
      badButton.innerText = "DON'T DO IT!"
      goodButton.setAttribute("name", "DO IT!")
      badButton.setAttribute("name", "DON'T DO IT")
      goodButton.setAttribute("dataset", this.do_it_count)
      badButton.setAttribute("dataset", this.dont_do_it_count)
      goodButton.setAttribute("onclick", `App.updatedDoItCount(event, ${this.id}, ${this.do_it_count})`)
      badButton.setAttribute("onclick",  `App.updatedDontDoItCount(event, ${this.id}, ${this.dont_do_it_count})`)
      h3.append(lineBreak)
      h3.append(goodButton)
      h3.append(badButton)
      div.append(h3)
      return div
    }

    badIdeaVoteRenderObserverNonUser() {
      let div = document.createElement('div')
      let h3 = document.createElement("h3")
      h3.innerText = `Vote On ${this.description}`
      let lineBreak = document.createElement("br")
      let goodButton = document.createElement("button")
      let badButton = document.createElement("button")
      let chart = document.getElementById('pieChart')
      chart.setAttribute("onclick", `App.removeChartNonUser()`)
      let stats = [this.do_it_count, this.dont_do_it_count]
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
      goodButton.setAttribute("value", "do_it")
      badButton.setAttribute("value", "dont_do_it")
      goodButton.innerText = "DO IT!"
      badButton.innerText = "DON'T DO IT!"
      goodButton.setAttribute("name", "DO IT!")
      badButton.setAttribute("name", "DON'T DO IT")
      goodButton.setAttribute("dataset", this.do_it_count)
      badButton.setAttribute("dataset", this.dont_do_it_count)
      goodButton.setAttribute("onclick", `App.updatedDoItCountNonUser(event, ${this.id}, ${this.do_it_count})`)
      badButton.setAttribute("onclick",  `App.updatedDontDoItCountNonUser(event, ${this.id}, ${this.dont_do_it_count})`)
      h3.append(lineBreak)
      h3.append(goodButton)
      h3.append(badButton)
      div.append(h3)
      return div
    }

    badIdeaRenderFull() {
      let div = document.createElement('div')
      let h2 = document.createElement('h2')
      let lineBreak = document.createElement("br")
      let lineBreak2 = document.createElement("br")
      h2.innerText = this.description
      let h4 = document.createElement('h4')
      let h43 = document.createElement('h4')
      h4.setAttribute("id", "choiceMaker")
      h4.innerText = "Was this a good idea?"
      let goodButton = document.createElement("button")
      let badButton = document.createElement("button")
      let deleteButton = document.createElement("button")
      let h42 = document.createElement('h4')
      h42.innerText = "Delete this idea?"
      h43.innerText = "Bear Votes"
      goodButton.setAttribute("value", "do_it")
      badButton.setAttribute("value", "dont_do_it")
      goodButton.innerText = "GOOD IDEA!"
      badButton.innerText = "BAD IDEA!"
      goodButton.setAttribute("onclick",  `App.goodBadIdea(event, ${this.id}, true)`)
      badButton.setAttribute("onclick",  `App.goodBadIdea(event, ${this.id}, false)`)
      deleteButton.innerText = "Delete Idea"
      deleteButton.setAttribute("onclick",  `App.deleteIdea(event, ${this.id})`)
      div.append(h2)
      div.append(h4)
      div.append(h43)
      h4.append(lineBreak)
      h4.append(goodButton)
      h4.append(badButton)
      let chart = document.getElementById('pieChart')
      let chartDiv = document.getElementById('pieChartDiv')
      chartDiv.append(h42)
      h42.append(lineBreak2)
      h42.append(deleteButton)
      let stats = [this.do_it_count, this.dont_do_it_count]
      chart.setAttribute("onclick", `App.removeChart()`)
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
      return div
    }
  }
})();
