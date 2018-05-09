export const ADD_MENU = 'ADD_MENU'  
  
export const LOAD_ROUTES = 'LOAD_ROUTES'  

export const generateRoutesFromMenu = (menu = [], routes = []) => {  
  for (let i = 0, l = menu.length; i < l; i++) {  
    let item = menu[i]  
    if (item.path) {  
      routes.push(item)  
    }  
  }  
  return routes;  
}