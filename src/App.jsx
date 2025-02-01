import "./index.css"
import './App.css'
import { useEffect, useState, useContext, useRef, useReducer, useMemo, useCallback } from 'react'
import UserContext from './main'
import SomeChild from './SomeChild'
import useLocalStorage from './useLocalStorage'

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
      case 'decrement':
        return state - 1 ;
      default:
        return state
    }
  }

function App() {
  const [count, setCount]= useState(0);
  const userInfo = useContext(UserContext);
  const ref = useRef(null);
  const [state, dispatch] = useReducer(reducer, 0)

  const handleClick = () => {
    setCount(count+1)
  }
  useEffect(()=> {
    console.log("hello Hooks useEffect");
  }, [count])


  const handleRef = () => {
    console.log(ref.current.value); // inputの中身
    console.log(ref.current.offsetHeight); // inputの高さ
  }

  // useMemo
  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);
//   const square = () => {
//     let i = 0;
//     while (i < 2000000000) {
//       i++
//   }
//     return count01 * count02;
// }
const square = useMemo(() => {
  let i = 0;
  while (i < 200000000) {
    i++
  }
  console.log("Click")
  return count01 * count02;
},[count02])

// useCallback memo Func
const [counter, setCounter] = useState(0);

// const showCount = () => {
//   alert("This is heavy function")
// }

const showCount = useCallback(() => {
  alert("This is heavy function")
}, [counter])

// Custom Hook    store to local storage
const [age, setAge] = useLocalStorage("age", 24);

  return (
    <>
     <div className='App'>
      <div className='flex'>
      {/* useState, useEffect */}
      <div className='useState useEffect border'>
        <h1>useState</h1>
        <button onClick={handleClick}>+</button>
        <p>{count}</p>
      </div>
      <hr />
      {/* useContext */}
      <div className='useContext'> {/* App.jsから直接propを渡せるようになる。loginとかに使う。 */}
        <h1>useContext</h1>
        <p>{userInfo.name}</p>
        <p>{userInfo.age}</p>
      </div>
     </div>
     <hr />
     {/* useRef */}
     <div className='useRef'> {/* referenceを引き出す。 inputとかで */}
        <h1>useRef</h1>
        <input type="text" ref={ref}/>
        <button onClick={handleRef}>useRef</button>
      </div>
      <hr />
      {/* useReducer */}
      <div className='useReducer'> {/* */}
        <h1>useReducer</h1>
        <p>Count : {state}</p>
        <button onClick={()=>dispatch({type:"increment"})}>+</button>
        <button onClick={()=>dispatch({type:"decrement"})}>-</button>
      </div>
      <hr />
      {/* useMemo */}
      <div className='useMemo'> {/* memo化することで、パフォーマンス向上　あんま使う機会ない。 */}
        <h1>useMemo</h1>
        <div>count01: {count01}</div>
        <div>count02: {count02}</div>
        <div>result: {square}</div>
        <button onClick={()=>setCount01(count01 + 1)}>+</button>
        <button onClick={()=>setCount02(count02 + 1)}>+</button>
      </div>
      <hr />
      {/* UseCallBack */}
      <div className='useCallback'> {/* 関数をmemo化することで無駄なレンダリングをなくす。*/}
        <h1>useCallback</h1>
        <SomeChild showCount={showCount}/>
      </div>
      <hr />
      {/* Custom Hook */}
      <div className='Custom Hook'> {/* 関数をmemo化することで無駄なレンダリングをなくす。*/}
        <h1>CustomHook</h1>
        <h2>useLocalStorage</h2>
        <p>{age}</p>
        <button onClick={()=> setAge(80)}>Set Age</button>
      </div>
      </div>

    </>
  )
}

export default App
