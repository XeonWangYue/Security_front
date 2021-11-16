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

export function postPackcount(hostname) {
  return request({
    url: '/packs',
    method: "POST",
    timeout: 10 * 1000,
    params: {
      hostname: hostname
    }
  })
}

export function postOneSecond(hostname) {
  return request({
    url: '/speed',
    method: "POST",
    params: {
      hostname: hostname
    }
  })
}

export function postSearch(bpfrule) {
  return request({
    url: "/search",
    method: "POST",
    params: {
      bpf: bpfrule
    }
  })
}

export function postWarning(hostname) {
  return request({
    url: '/warning',
    method: "POST",
    params: {
      hostname: hostname
    }
  })
}

export function postDisable(hostname){
  return request({
    url: '/disable',
    method: "POST",
    params: {
      hostname: hostname
    }
  })
}