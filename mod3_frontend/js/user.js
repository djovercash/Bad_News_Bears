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
  }
})();
