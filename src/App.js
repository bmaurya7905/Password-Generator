import {useState , useCallback , useEffect ,useRef} from 'react';
import './App.css';

function App() {
  const [length , setlength] = useState(8)
  const [numberallow , setnumberallow]=useState(false)
  const [charallow , setcharallow] = useState(false)
  const [password , setpassword] = useState("")
//for Ref hook
  const passwordref = useRef(null)
//it use for optimization
  const passwordgenerator = useCallback(() => {
    let pass = ""
    let str = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberallow) str +="0123456789"
    if (charallow) str +="!@#$%^&*_-+=[]{}~`"

    for(let i=1;i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)

    }
    setpassword(pass)


  }, [length ,numberallow , charallow ,setpassword])

  const copyPassswordToClipboard = () =>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(password)
  }

  useEffect(() => { 
    passwordgenerator()
  }, [length,numberallow,charallow,passwordgenerator])
  return (
    <>
    <div className='text'> 
      <h2>Password generator</h2>
      <div className='inputarea'>
      <input className='inputt'
       type="text"
        value={password}
       placeholder='password'
       readOnly 
       ref={passwordref}
       />
      <button onClick={copyPassswordToClipboard}>Copy</button>
    </div>
    <div className='text2'>
    <div className='inputarea2'>
      <input type="range"
        min={6}
        max={100}
        value={length}
        onChange={(e) => {setlength(e.target.value)}}
      />
      <label htmlFor="">Lenth: {length}</label>
    </div>
    <div className='inputarea3'>
    <input 
    type="checkbox"
    defaultChecked={numberallow}
    id='numberinput'
    onChange={() => {
      setnumberallow((prev) => !prev);
    }} />
    <label htmlFor="">Numbers</label>
    </div>
    <div className='inputarea3'> 
      <input 
      type="checkbox"
      defaultChecked={charallow}
      id='charinput'
      onChange={() => {
        setcharallow((prev) => !prev);
      }} />
      <label htmlFor="">Character</label>
    </div>
    </div>
    </div>
    
    </>
  );
}

export default App;
