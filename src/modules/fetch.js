export function get(url, callback) {
  fetch(url)
    .then(res => res.json())
    .then(callback);
}
export function post(url, payload, callback) {
  fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(callback);
}
export function getAuthenticated(url, callback, all = false) {
  //TODO: this assumes there's already an "?" in the url

  function paginate(page) {
    let totalPages;
    fetch(url + "&page=" + page, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
      .then(res => {
        totalPages = res.headers.get("x-wp-totalpages");
        console.log(totalPages);
        return res.json();
      })
      .then(data => {
        if (all && page < totalPages) {
          page++;
          paginate(page);
        }
        callback(data);
      });
  }
  paginate(1);
}
export function postAuthenticated(url, payload, callback) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(callback);
}
export function putAuthenticated(url, payload, callback) {
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(callback);
}
export function deleteAuthenticated(url, callback) {
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  })
    .then(res => res.json())
    .then(callback);
}
