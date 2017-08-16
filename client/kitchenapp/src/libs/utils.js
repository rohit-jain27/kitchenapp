// ========================================================
// Make Action Creator
// ========================================================
// reduce boilerplate when creating action creators.
// this is a method developed to reduce redux boilerplate.
// instead of writing out the action creators manually, we
// can use this method as described in the redux documentation:
// http://redux.js.org/docs/recipes/ReducingBoilerplate.html

export function makeActionCreator(type, ...argNames) {
  return function (...args) {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}