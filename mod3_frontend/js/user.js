const User = (function() {

  return class User {
    constructor(json) {
      this.id = json.id
      this.user = json.username
    }

    renderUsername() {
      let h3 = document.createElement('h3')
      h3.innerText = `Welcome Back ${this.user}`
      h3.setAttribute("id", "userId")
      h3.setAttribute("data-id", this.id)
      h3.setAttribute("onclick", `App.logOut()`)
      return h3
    }

    static renderCreateUserForm() {
      let form = document.createElement('form')
      let h2 = document.createElement('h2')
      h2.innerText = `Join the Bad News Bears Community`
      let input = document.createElement('input')
      let submitInput = document.createElement('input')
      let lBreak = document.createElement("br")
      let lBreak2 = document.createElement("br")
      form.setAttribute("id", "newUserForm")
      input.setAttribute("placeholder", "Username")
      input.setAttribute("id", "newUserInput")
      submitInput.setAttribute("onclick", `App.createNewUser(event)`)
      submitInput.setAttribute("type", "submit")
      submitInput.setAttribute("value", "Be A Bad News Bear")
      form.append(h2)
      h2.append(lBreak)
      form.append(input)
      form.append(lBreak2)
      form.append(submitInput)
      return form
    }
  }
})();
