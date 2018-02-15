const Adapter = (function() {
  const USERURL = "http://localhost:3000/api/v1/users"
  const IDEAURL = "http://localhost:3000/api/v1/ideas"

  return class Adapter {

    static getUsers() {
      return fetch(USERURL).then(res => res.json())
    }

    static getIdeas() {
      return fetch(IDEAURL).then(res => res.json())
    }

    static createIdea(userId, description) {
      return fetch(IDEAURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userId,
          description: description
        })
      }).then(res => res.json())
    }

    static updatedDoItCount(ideaID, count) {
      return fetch(`${IDEAURL}/${ideaID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          do_it: count
        })
      }).then(res => res.json())
    }

    static updatedDontDoItCount(ideaID, count) {
      return fetch(`${IDEAURL}/${ideaID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dont_do_it: count
        })
      }).then(res => res.json())
    }

    static updateOutcome(id, feeling, outcome) {
      fetch(`${IDEAURL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          outcome: outcome,
          good: feeling
        })
      })
    }

    static deleteIdea(id) {
      fetch(`${IDEAURL}/${id}`, {
        method: "DELETE"
      })
    }

  }
})();
