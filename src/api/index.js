import {request} from "utils/requestUtil";

export function postSystem(hostname) {
  return request({
    url: '/system',
    method: "POST",
    params: {
      hostname: hostname,
    }
  })
}

export function postHosts() {
  return request({
    url: '/hosts',
    method: "POST",
  })
}