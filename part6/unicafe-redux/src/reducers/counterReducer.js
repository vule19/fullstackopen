const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newGOOD = {
        good: state.good + 1,
        ok:state.ok,
        bad: state.bad
      }
      return newGOOD
    case 'OK':
      const newOK = {
        good: state.good,
        ok:state.ok + 1,
        bad: state.bad
      }
      return newOK
    case 'BAD':
      const newBAD = {
        good: state.good,
        ok:state.ok,
        bad: state.bad + 1
      }
      return newBAD
    case 'RESET':
      const resetState = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return resetState
    default:
      return state
  }
}

export default counterReducer
