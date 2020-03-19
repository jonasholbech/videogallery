//TODO: should we ask about accessToken from localStorage here?
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
export function getAuthenticated(url, token, callback) {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(callback);
}
export function postAuthenticated(url, token, payload, callback) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(callback);
}
export function putAuthenticated(url, token, payload, callback) {
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(callback);
}
export function deleteAuthenticated(url, token, callback) {
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(callback);
}
