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

export function postSrcIp(src, dst, ps, pd, type) {
  return request({
    url: '/searchBySrcIp',
    method: "POST",
    params: {
      srcIp: src,
      dstIp: dst,
      srcPort: ps,
      dstPort: pd,
      type: type
    }
  })
}
