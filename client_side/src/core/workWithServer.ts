import {serverURI} from "@/config/serverURI";

const server = serverURI

const workWithServer = {
  //work with user
  currentUser: () => {
    return requestGet(`${server}/user/current-user/`)
  },
  login: (data: IUser) => {
    return requestPost(`${server}/user/login/`, data)
  },
  signup: (data: IUser) => {
    return requestPost(`${server}/user/sign-up/`, data)
  },
  changeUserDate: (data: FormData) => {
    return requestPostFormData(`${server}/user/change-user-data/`, data)
  },
  getUserAvatar: (imageName: string) => {
    return `${server}/user/avatar/${imageName}`
  },
  // work with integration app
  getAllApp: () => {
    return requestGet(`${server}/integration-app/get-all-apps/`)
  },
  // work with integration user
  getIntegrationUsers: () => {
    return requestGet(`${server}/integration-user/get-integration-users/`)
  },
  // work with integration user
  getStatusAccounts: (data: number[]) => {
    return requestPost(`${server}/integration-user/get-status-accounts/`, data)
  },
  deleteUserAndCabinet: (data: SelectedRowIntegration[]) => {
    return requestPost(`${server}/integration-user/delete-users-and-cabinets/`, data)
  },
  loginFB: (data: {token: string}) => {
    return requestPost(`${server}/integration-user/login-FB/`, data)
  },
  // work with integration cabinet
  setCabinetInfo: (data: {cabinet_id: number, factor: number, access_get_statistic: boolean}) => {
    return requestPost(`${server}/integration-cabinet/set-cabinet-info/`, data)
  },
  getIntegrationCabinetsFromFB: (data: {account_id: number}) => {
    return requestPost(`${server}/integration-cabinet/get-integration-cabinets-from-FB/`, data)
  },
  saveIntegrationCabinetsFromFB: (data: {account_id: number, cabinets: IIntegrationCabinet[]}) => {
    return requestPost(`${server}/integration-cabinet/save-integration-cabinets-from-FB/`, data)
  },

  getCampaignsName: () => {
    return requestGet(`${server}/integration-cabinet/get-campaigns-name/`)
  },

  // work with statistic
  saveStatistic: (data: Statistic) => {
    return requestPost(`${server}/statistic/save-statistic/`, data)
  },
}
export default workWithServer

function status(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response.json())
  } else {
    return Promise.reject(response.text())
  }
}

async function request(url: string, body: object) {
  return await fetch(url, body).then(status)
}

async function requestGet(url: string) {
  const headers: any = {
    'Accept': 'application/json, text/plain, */*',
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    'X-Requested-With': 'XMLHttpRequest',
  };
  let token = getCookie('token');
  token && (headers['Authorization'] = `Bearer ${token}`);
  return await request(url, {
    // credentials: 'include',
    method: 'GET',
    headers: headers,
  })
}

async function requestPost(url: string, data: object) {
  const headers: any = {
    'Accept': 'application/json, text/plain, */*',
    "Content-type": "application/json; charset=UTF-8",
    'X-Requested-With': 'XMLHttpRequest',
  };
  let token = getCookie('token');
  token && (headers['Authorization'] = `Bearer ${token}`);
  return await request(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
}

async function requestPostFormData(url: string, data: object) {
  const headers: any = {
  };
  let token = getCookie('token');
  token && (headers['Authorization'] = `Bearer ${token}`);
  return await request(url, {
    method: 'POST',
    headers: headers,
    body: data
  })
}

function getCookie(name: string) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([.$?*|{}()[]\/+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined
}

// const setCookie = (name, value, props = {'Path': '/', maxAge: 1800}) => {
//   let exp = props.expires;
//   if (typeof exp == "number" && exp) {
//     let d = new Date();
//     d.setTime(d.getTime() + exp * 1000)
//     exp = props.expires = d
//   }
//   if (exp && exp.toUTCString) {
//     props.expires = exp.toUTCString()
//   }
//
//   value = encodeURIComponent(value)
//   let updatedCookie = name + "=" + value
//
//   for (let propName in props) {
//     updatedCookie += "; " + propName
//     let propValue = props[propName]
//     if (propValue !== true) {
//       updatedCookie += "=" + propValue
//     }
//   }
//
//   document.cookie = updatedCookie
// }
