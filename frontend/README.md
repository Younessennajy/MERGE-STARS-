# React სტარტერი — სასწავლო პროექტი

> ქართულენოვანი სახელმძღვანელო React-ის ძირითადი კონცეფციების შესასწავლად.  
> პროექტი შედგება 7 ინტერაქტიური გაკვეთილისგან, თითოეული ახსნილია ცოცხალი მაგალითებით.

---

## შინაარსი

1. [პროექტის გაშვება](#პროექტის-გაშვება)
2. [პროექტის სტრუქტურა](#პროექტის-სტრუქტურა)
3. [გაკვეთილების მიმოხილვა](#გაკვეთილების-მიმოხილვა)
4. [რა არის React?](#რა-არის-react)
5. [Virtual DOM](#virtual-dom)
6. [JSX](#jsx)
7. [კომპონენტები](#კომპონენტები)
8. [Props](#props)
9. [State](#state)
10. [ივენთების დამუშავება](#ივენთების-დამუშავება)
11. [სიები და Keys](#სიები-და-keys)
12. [პირობითი რენდერი](#პირობითი-რენდერი)
13. [useEffect და Lifecycle](#useeffect-და-lifecycle)
14. [Hooks-ის წესები](#hooks-ის-წესები)
15. [React-ის ფილოსოფია](#react-ის-ფილოსოფია)
16. [შემდეგი ნაბიჯები](#შემდეგი-ნაბიჯები)

---

## პროექტის გაშვება

### წინაპირობები

- [Node.js](https://nodejs.org/) ვერსია 18 ან უფრო ახალი
- npm (Node.js-თან ერთად მოდის)

### ინსტალაცია და გაშვება

```bash
# 1. დააკლონე რეპოზიტორია ან გახსენი პროექტის საქაღალდე
cd reactt

# 2. დააინსტალირე დამოკიდებულებები
npm install

# 3. გაუშვი სამუშაო სერვერი
npm run dev
```

სერვერი გაეშვება მისამართზე: **http://localhost:5173**

### სხვა ბრძანებები

```bash
npm run build    # პროდაქშენ build-ის შექმნა
npm run preview  # build-ის გადახედვა
npm run lint     # კოდის შემოწმება ESLint-ით
```

---

## პროექტის სტრუქტურა

```
reactt/
├── public/                  # სტატიკური ფაილები
├── src/
│   ├── components/
│   │   ├── HelloWorld.jsx   # გაკვეთილი 1 — კომპონენტები და JSX
│   │   ├── PropsDemo.jsx    # გაკვეთილი 2 — Props
│   │   ├── StateDemo.jsx    # გაკვეთილი 3 — State (useState)
│   │   ├── EventsDemo.jsx   # გაკვეთილი 4 — ივენთების დამუშავება
│   │   ├── ListsDemo.jsx    # გაკვეთილი 5 — სიები და Keys
│   │   ├── ConditionalDemo.jsx  # გაკვეთილი 6 — პირობითი რენდერი
│   │   └── UseEffectDemo.jsx    # გაკვეთილი 7 — useEffect
│   ├── App.jsx              # მთავარი კომპონენტი (ნავიგაცია)
│   ├── App.css              # სტილები
│   ├── main.jsx             # შესასვლელი წერტილი
│   └── index.css            # გლობალური სტილები
├── index.html
├── package.json
└── vite.config.js
```

---

## გაკვეთილების მიმოხილვა

| # | გაკვეთილი | ძირითადი ცნება | ფაილი |
|---|-----------|---------------|-------|
| 1 | კომპონენტები და JSX | ფუნქციური კომპონენტი, JSX სინტაქსი | `HelloWorld.jsx` |
| 2 | Props | მონაცემების გადაცემა მშობლიდან შვილზე | `PropsDemo.jsx` |
| 3 | State | `useState`, re-render, მდგომარეობის მართვა | `StateDemo.jsx` |
| 4 | ივენთები | `onClick`, `onChange`, `onSubmit`, `e.preventDefault()` | `EventsDemo.jsx` |
| 5 | სიები და Keys | `.map()`, `key` prop, მასივების განახლება | `ListsDemo.jsx` |
| 6 | პირობითი რენდერი | ternary, `&&`, early return | `ConditionalDemo.jsx` |
| 7 | useEffect | side effects, dependency array, cleanup | `UseEffectDemo.jsx` |

---

## რა არის React?

**React** არის JavaScript-ის ბიბლიოთეკა მომხმარებლის ინტერფეისების (UI) შესაქმნელად. შექმნილია Facebook-ის (Meta) მიერ 2013 წელს და დღეს ერთ-ერთი ყველაზე პოპულარული frontend ინსტრუმენტია მსოფლიოში.

### React-ის ძირითადი იდეა

ტრადიციულ web-განვითარებაში პროგრამისტი პირდაპირ მანიპულირებდა HTML DOM-ს (Document Object Model) — ამატებდა ელემენტებს, ცვლიდა ტექსტს, წყვეტდა ივენთებს. ეს მიდგომა სწრაფად გართულდება დიდ პროექტებში.

React გვთავაზობს სხვა მიდგომას:

> **"დაწერე როგორ გამოიყურება UI მოცემულ მდგომარეობაში — React თვითონ იზრუნებს DOM-ის განახლებაზე."**

ეს ნიშნავს, რომ შენ განსაზღვრავ **რა** უნდა გამოჩნდეს (declarative), React კი ხვდება **როგორ** შეცვალოს DOM ეფექტურად.

### Declarative vs Imperative

```javascript
// ✗ Imperative (jQuery სტილი) — ამბობ "როგორ"
const btn = document.getElementById('btn')
const counter = document.getElementById('counter')
let count = 0
btn.addEventListener('click', () => {
  count++
  counter.textContent = count
})

// ✓ Declarative (React სტილი) — ამბობ "რა"
function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

---

## Virtual DOM

### რა პრობლემა გვაქვს?

ბრაუზერის DOM-ის განახლება ძვირადღირებული ოპერაციაა — ყოველი ცვლილება იწვევს გვერდის გახატვის (layout/paint) პროცესს. თუ UI-ს ხშირად ვანახლებთ, ეს შეიძლება ნელი გახდეს.

### Virtual DOM-ის გამოსავალი

React ინახავს DOM-ის **მსუბუქ ასლს მეხსიერებაში** — ამას ეძახიან Virtual DOM-ს.

**პროცესი ასე მუშაობს:**

```
1. State შეიცვალა
        ↓
2. React ქმნის ახალ Virtual DOM ხეს
        ↓
3. ადარებს ძველ Virtual DOM-ს ახალს (Diffing/Reconciliation)
        ↓
4. პოულობს მხოლოდ შეცვლილ ნაწილებს
        ↓
5. ანახლებს მხოლოდ იმ ნაწილებს რეალურ DOM-ში
```

ეს პროცესი ეწოდება **Reconciliation** და სწორედ ის ხდის React-ს ეფექტურს — DOM-ში მინიმალური ცვლილებები ხდება.

---

## JSX

**JSX** (JavaScript XML) არის სინტაქსური გაფართოება JavaScript-ისთვის, რომელიც გაძლევს HTML-ის მსგავსი კოდის JavaScript-ში ჩასმის საშუალებას.

### JSX კომპილაცია

JSX არ არის ნამდვილი HTML — Babel/Vite კომპილატორი გარდაქმნის მას JavaScript ფუნქციის გამოძახებებად:

```jsx
// შენ წერ:
const element = <h1 className="title">გამარჯობა!</h1>

// კომპილატორი გარდაქმნის:
const element = React.createElement('h1', { className: 'title' }, 'გამარჯობა!')
```

### JSX-ის მნიშვნელოვანი წესები

**1. ერთი root ელემენტი**
```jsx
// ✗ არასწორი — ორი root ელემენტი
return (
  <h1>სათაური</h1>
  <p>ტექსტი</p>
)

// ✓ სწორი — Fragment-ის გამოყენება
return (
  <>
    <h1>სათაური</h1>
    <p>ტექსტი</p>
  </>
)
```

**2. `class` → `className`**
```jsx
// HTML-ში: <div class="card">
// JSX-ში:
<div className="card">
```

**3. JavaScript გამოთქმები `{}` ფიგურულ ფრჩხილებში**
```jsx
const name = 'სტუდენტი'
const age = 20

return (
  <p>{name} არის {age} წლის</p>
)
```

**4. თვითდამხურავი თეგები**
```jsx
// ✗ HTML-ში შეიძლება: <img> <input> <br>
// ✓ JSX-ში სავალდებულოა:
<img src="photo.jpg" alt="ფოტო" />
<input type="text" />
<br />
```

**5. camelCase ატრიბუტები**
```jsx
<button onClick={handler} />      // onclick → onClick
<input onChange={handler} />      // onchange → onChange
<label htmlFor="input" />         // for → htmlFor
<div style={{ fontSize: 16 }} />  // font-size → fontSize
```

---

## კომპონენტები

კომპონენტი არის React-ის **მშენებელი ბლოკი** — JavaScript ფუნქცია, რომელიც JSX-ს აბრუნებს.

### ფუნქციური კომპონენტი

```jsx
function Welcome() {
  return <h1>კეთილი მოსვლა!</h1>
}

// Arrow function ვარიანტი
const Welcome = () => <h1>კეთილი მოსვლა!</h1>
```

### კომპონენტების კომბინირება

კომპონენტები შეიძლება სხვა კომპონენტებში ჩაიდოს — ამ გზით ვქმნით **კომპონენტთა ხეს (component tree)**:

```jsx
function Header() {
  return <header><h1>ჩემი საიტი</h1></header>
}

function Footer() {
  return <footer><p>© 2024</p></footer>
}

function App() {
  return (
    <>
      <Header />
      <main>
        <p>შინაარსი...</p>
      </main>
      <Footer />
    </>
  )
}
```

### კომპონენტის სახელდების წესი

კომპონენტის სახელი **სავალდებულოდ** დიდი ასოთი უნდა დაიწყოს:

```jsx
// ✓ სწორი
<MyComponent />
<StudentCard />
<App />

// ✗ არასწორი — React-ი ამას HTML თეგად ჩათვლის
<myComponent />
<studentCard />
```

### კომპონენტის ექსპორტი

```jsx
// Default export (ფაილზე მხოლოდ ერთი)
export default function App() { ... }

// Named export (ფაილზე რამდენიც გინდა)
export function Button() { ... }
export function Input() { ... }

// იმპორტი
import App from './App'              // default
import { Button, Input } from './UI' // named
```

---

## Props

**Props** (properties) — მონაცემების მშობელი კომპონენტიდან შვილ კომპონენტში გადაცემის მექანიზმი.

### Props-ების გადაცემა და მიღება

```jsx
// მშობელი გადასცემს:
<UserCard name="გიორგი" age={25} isAdmin={true} />

// შვილი იღებს:
function UserCard(props) {
  return <p>{props.name} — {props.age} წ.</p>
}

// ან Destructuring-ით (უფრო სუფთა):
function UserCard({ name, age, isAdmin }) {
  return <p>{name} — {age} წ.</p>
}
```

### Default Props

```jsx
function Button({ label = 'დაჭერა', color = 'blue' }) {
  return <button style={{ background: color }}>{label}</button>
}

// label-ი და color-ი default მნიშვნელობებს მიიღებს
<Button />
```

### Children Prop

`children` სპეციალური prop-ია — ის შეიცავს კომპონენტს შორის ჩასმულ შინაარსს:

```jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  )
}

// გამოყენება:
<Card title="ამბავი">
  <p>აქ არის ტექსტი</p>
  <img src="photo.jpg" />
</Card>
```

### Props-ის შეზღუდვა

Props **მხოლოდ წასაკითხია** — კომპონენტს საკუთარი props-ის შეცვლა არ შეუძლია. ეს ეწოდება **unidirectional data flow** (ცალმხრივი მონაცემთა ნაკადი).

```jsx
function Child({ count }) {
  // ✗ არასწორი — props-ის შეცვლა
  count = count + 1

  // ✓ სწორი — props მხოლოდ წაიკითხე
  return <p>{count}</p>
}
```

---

## State

**State** — კომპონენტის შიდა მდგომარეობა, რომელიც დროთა განმავლობაში შეიძლება შეიცვალოს. State-ის ყოველ განახლებაზე React კომპონენტს ხელახლა ხატავს.

### useState Hook

```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  //     ↑ მიმდინარე მნიშვნელობა
  //            ↑ განახლების ფუნქცია
  //                         ↑ საწყისი მნიშვნელობა

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  )
}
```

### State-ის სწორად განახლება

```jsx
// ✗ არასწორი — პირდაპირი მუტაცია
count = count + 1
count++

// ✓ სწორი — setter ფუნქციის გამოყენება
setCount(count + 1)

// ✓ უკეთესი — ფუნქციური განახლება (როცა ახალი state წინაზეა დამოკიდებული)
setCount(prev => prev + 1)
```

### ობიექტის State

```jsx
const [user, setUser] = useState({ name: 'ანი', age: 20 })

// ✗ არასწორი — ობიექტის პირდაპირი შეცვლა
user.age = 21

// ✓ სწორი — ახალი ობიექტის შექმნა spread operator-ით
setUser({ ...user, age: 21 })
```

### მასივის State

```jsx
const [items, setItems] = useState(['ვაშლი', 'ბანანი'])

// დამატება
setItems([...items, 'ბალი'])
setItems(prev => [...prev, 'ბალი'])

// წაშლა
setItems(items.filter(item => item !== 'ვაშლი'))

// განახლება
setItems(items.map(item =>
  item === 'ვაშლი' ? 'ᲕᲐᲨᲚᲘ' : item
))
```

### State vs Props

| | State | Props |
|---|---|---|
| **ვინ განსაზღვრავს** | კომპონენტი თვითონ | მშობელი კომპონენტი |
| **შეიძლება შეიცვალოს** | დიახ, setter-ით | არა (read-only) |
| **ინახება** | კომპონენტის შიგნით | კომპონენტს გარეთ |
| **re-render** | განახლებისას | განახლებისას |

---

## ივენთების დამუშავება

### ძირითადი ივენთები

```jsx
// კლიკი
<button onClick={() => console.log('დაჭირდა!')}>კლიკი</button>

// Input-ის ცვლილება
<input onChange={e => setValue(e.target.value)} />

// ფორმის გაგზავნა
<form onSubmit={e => { e.preventDefault(); send() }}>

// მაუსი
<div onMouseEnter={() => setHover(true)}
     onMouseLeave={() => setHover(false)} />

// კლავიატურა
<input onKeyDown={e => e.key === 'Enter' && submit()} />

// Focus
<input onFocus={() => setFocused(true)}
       onBlur={() => setFocused(false)} />
```

### Event Object (e)

```jsx
function handleChange(e) {
  console.log(e.target.value)     // input-ის მნიშვნელობა
  console.log(e.target.name)      // input-ის name ატრიბუტი
  console.log(e.target.checked)   // checkbox-ის მდგომარეობა
  e.preventDefault()               // default ქმედების გაუქმება
  e.stopPropagation()             // ბუშტივით ზემოთ ავრცელების შეჩერება
}
```

### კონტროლირებადი Input-ები

React-ში input-ების მდგომარეობა state-ში ინახება — ამას ეძახიან **controlled component**-ს:

```jsx
function Form() {
  const [email, setEmail] = useState('')

  return (
    <input
      type="email"
      value={email}                          // state-იდან კითხულობს
      onChange={e => setEmail(e.target.value)} // state-ს ანახლებს
    />
  )
}
```

---

## სიები და Keys

### .map() სიების გახატვისთვის

```jsx
const students = ['ანი', 'გიორგი', 'ნინო']

function StudentList() {
  return (
    <ul>
      {students.map((name, index) => (
        <li key={index}>{name}</li>
      ))}
    </ul>
  )
}
```

### Key Prop — რატომ არის საჭირო?

`key` prop ეხმარება React-ს გაიგოს, **კონკრეტულად რომელი ელემენტი შეიცვალა** სიის განახლებისას. გარეშე ამისა React ყველაფერს ხელახლა ხატავს.

```jsx
// ✗ key-ს გარეშე — React გაფრთხილებს
{items.map(item => <li>{item.name}</li>)}

// ✓ key-ით — React ეფექტურია
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

### Key-ის სწორი არჩევა

```jsx
// ✓ საუკეთესო — უნიკალური ID
{users.map(user => <Card key={user.id} user={user} />)}

// ✓ მისაღები სტატიკური სიებისთვის — ინდექსი
{STATIC_LIST.map((item, i) => <li key={i}>{item}</li>)}

// ✗ ცუდი — Math.random() ყოველ render-ზე სხვაა
{items.map(item => <li key={Math.random()}>{item}</li>)}
```

### სიების CRUD ოპერაციები

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'React-ის სწავლა', done: false },
    { id: 2, text: 'პროექტის შექმნა', done: false },
  ])

  // დამატება
  function addTodo(text) {
    setTodos(prev => [...prev, { id: Date.now(), text, done: false }])
  }

  // წაშლა
  function deleteTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  // განახლება
  function toggleTodo(id) {
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    )
  }
}
```

---

## პირობითი რენდერი

### 1. Ternary ოპერატორი `? :`

```jsx
// ორი ალტერნატივა — ერთი აუცილებლად გამოჩნდება
{isLoggedIn
  ? <Dashboard />
  : <LoginPage />
}

// ინლაინ ტექსტი
<p>{score >= 50 ? 'ჩაბარებულია ✓' : 'ჩაჭრილია ✗'}</p>
```

### 2. && ოპერატორი

```jsx
// მხოლოდ მაშინ გამოიჩინე, როცა პირობა true-ა
{isAdmin && <AdminPanel />}
{hasError && <ErrorMessage text={error} />}
{notifications.length > 0 && (
  <span className="badge">{notifications.length}</span>
)}
```

**გაფრთხილება — ნუ გამოიყენებ რიცხვებთან:**
```jsx
// ✗ ეს დახატავს "0" ეკრანზე (0 falsy-ა, მაგრამ React-ი ხატავს)
{count && <List />}

// ✓ სწორი — boolean-ად გადაიყვანე
{count > 0 && <List />}
{!!count && <List />}
{Boolean(count) && <List />}
```

### 3. if/return ადრეული გასვლა

```jsx
function UserProfile({ user, loading, error }) {
  if (loading) return <Spinner />
  if (error)   return <p>შეცდომა: {error.message}</p>
  if (!user)   return <p>მომხმარებელი ვერ მოიძებნა</p>

  // მხოლოდ ამ წერტილს მიაღწევს, თუ user არსებობს
  return <p>გამარჯობა, {user.name}!</p>
}
```

### 4. Switch/Object Map

```jsx
// switch სტატუსებისთვის
function StatusBadge({ status }) {
  switch(status) {
    case 'active':  return <span className="green">აქტიური</span>
    case 'pending': return <span className="yellow">მოლოდინში</span>
    case 'banned':  return <span className="red">დაბლოკილი</span>
    default:        return <span>უცნობი</span>
  }
}

// ობიექტის map (cleaner)
const STATUS_LABELS = {
  active:  <span className="green">აქტიური</span>,
  pending: <span className="yellow">მოლოდინში</span>,
  banned:  <span className="red">დაბლოკილი</span>,
}

function StatusBadge({ status }) {
  return STATUS_LABELS[status] ?? <span>უცნობი</span>
}
```

---

## useEffect და Lifecycle

### კომპონენტის სიცოცხლის ციკლი

```
კომპონენტი იქმნება (Mount)
       ↓
   ხატავს (Render)
       ↓
   DOM განახლება
       ↓
  useEffect-ი გაეშვება
       ↓
  State/Props შეიცვალა
       ↓
   ხელახლა ხატავს (Re-render)
       ↓
  useEffect cleanup + ახლის გაშვება
       ↓
  კომპონენტი ამოიღება (Unmount)
       ↓
  useEffect cleanup გაეშვება
```

### useEffect-ის სინტაქსი

```jsx
useEffect(() => {
  // side effect-ის კოდი

  return () => {
    // cleanup ფუნქცია (სურვილისამებრ)
  }
}, [/* dependency array */])
```

### Dependency Array-ის ვარიანტები

```jsx
// 1. Dependency Array-ის გარეშე — ყოველ render-ზე გაეშვება
useEffect(() => {
  console.log('ყოველ render-ზე')
})

// 2. ცარიელი მასივი — მხოლოდ mount-ზე ერთხელ
useEffect(() => {
  console.log('კომპონენტი გამოჩნდა')
  return () => console.log('კომპონენტი გაქრა')
}, [])

// 3. კონკრეტული დამოკიდებულებები — მხოლოდ მათი ცვლილებისას
useEffect(() => {
  console.log('userId შეიცვალა:', userId)
}, [userId])
```

### გავრცელებული useEffect პატერნები

**ტაიმერი:**
```jsx
useEffect(() => {
  const id = setInterval(() => setTime(t => t + 1), 1000)
  return () => clearInterval(id)  // cleanup!
}, [])
```

**API გამოძახება:**
```jsx
useEffect(() => {
  let cancelled = false

  async function fetchData() {
    const res = await fetch(`/api/users/${userId}`)
    const data = await res.json()
    if (!cancelled) setUser(data)  // unmount-ის შემდეგ state-ის განახლება არ ხდება
  }

  fetchData()
  return () => { cancelled = true }
}, [userId])
```

**Event Listener:**
```jsx
useEffect(() => {
  const handler = e => setKey(e.key)
  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}, [])
```

**Document Title:**
```jsx
useEffect(() => {
  document.title = `${count} შეტყობინება`
}, [count])
```

---

## Hooks-ის წესები

React Hooks-ს (useState, useEffect და სხვა) **მხოლოდ გარკვეულ პირობებში** შეიძლება გამოიყენო.

### წესი 1: მხოლოდ ფუნქციური კომპონენტების ან სხვა Hooks-ის შიგნით

```jsx
// ✓ სწორი
function MyComponent() {
  const [value, setValue] = useState(0)  // კომპონენტის შიგნით
  return <div>{value}</div>
}

// ✗ არასწორი — ჩვეულებრივ ფუნქციაში
function regularFunction() {
  const [value, setValue] = useState(0)  // შეცდომა!
}
```

### წესი 2: მხოლოდ კომპონენტის თავში (top level)

```jsx
// ✓ სწორი — ყოველთვის გამოიძახება
function Form() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  useEffect(() => { ... }, [])
}

// ✗ არასწორი — პირობის შიგნით
function Form() {
  if (someCondition) {
    const [name, setName] = useState('')  // შეცდომა!
  }
}

// ✗ არასწორი — ციკლის შიგნით
function List() {
  items.forEach(item => {
    const [checked, setChecked] = useState(false)  // შეცდომა!
  })
}
```

**რატომ?** React-ი ენდობა Hooks-ის გამოძახების **თანმიმდევრობას** კომპონენტის ყოველ render-ზე. პირობებმა ან ციკლებმა შეიძლება შეცვალოს ეს თანმიმდევრობა.

---

## React-ის ფილოსოფია

### 1. Composition over Inheritance

React-ში ჩვენ ვქმნით კომპლექსურ UI-ს **მარტივი კომპონენტების შეერთებით** — არა მემკვიდრეობის (inheritance) გზით:

```jsx
// ✓ React-ის სტილი — კომბინირება
function Page() {
  return (
    <Layout>
      <Sidebar>
        <Navigation />
      </Sidebar>
      <Content>
        <ArticleList />
      </Content>
    </Layout>
  )
}
```

### 2. Single Responsibility

თითოეული კომპონენტი ერთ რამეს უნდა აკეთებდეს კარგად:

```jsx
// ✗ ძალიან ბევრი პასუხისმგებლობა
function UserDashboard() {
  // fetch-ავს მომხმარებლის მონაცემებს
  // ხატავს navigation-ს
  // ხატავს სტატისტიკას
  // ამუშავებს settings-ის ფორმას
  // ...
}

// ✓ გაყოფილი პასუხისმგებლობებად
function UserDashboard() {
  return (
    <>
      <UserNav />
      <UserStats />
      <UserSettings />
    </>
  )
}
```

### 3. Lifting State Up

თუ ორ კომპონენტს ერთი მდგომარეობა სჭირდება, ის **საერთო მშობლამდე "ამაღლდება"**:

```jsx
function Parent() {
  const [value, setValue] = useState('')  // state მშობელშია

  return (
    <>
      <InputChild value={value} onChange={setValue} />
      <DisplayChild value={value} />
    </>
  )
}
```

### 4. Immutability (უცვლელობა)

React-ში state **არასდროს** შეიცვლება პირდაპირ — ყოველთვის იქმნება ახალი ობიექტი:

```jsx
// ✗ Mutation — React-ი ვერ შეამჩნევს ცვლილებას
state.items.push(newItem)
setState(state)

// ✓ Immutability — ახალი მასივი
setState(prev => ({ ...prev, items: [...prev.items, newItem] }))
```

---

## შემდეგი ნაბიჯები

ამ პროექტის დასრულების შემდეგ, შემდეგ ეტაპზე შეისწავლე:

### საშუალო დონე
- **`useContext`** — მონაცემების "ბურღვის" (prop drilling) თავიდან არიდება
- **`useReducer`** — კომპლექსური state-ის მართვა
- **`useRef`** — DOM ელემენტებზე პირდაპირი წვდომა
- **`useMemo` / `useCallback`** — performance-ის ოპტიმიზაცია
- **Custom Hooks** — ლოგიკის ხელახლა გამოყენება

### პრაქტიკული ბიბლიოთეკები
- **React Router** — გვერდებს შორის ნავიგაცია (`react-router-dom`)
- **Zustand / Redux** — გლობალური state-ის მართვა
- **React Query / SWR** — სერვერის მდგომარეობის მართვა
- **React Hook Form** — ფორმების მართვა

### სასარგებლო რესურსები
- [react.dev](https://react.dev) — React-ის ოფიციალური დოკუმენტაცია
- [Vite](https://vitejs.dev) — Build ინსტრუმენტი, რომელსაც ეს პროექტი იყენებს

---

## ტექნოლოგიური სტეკი

| ტექნოლოგია | ვერსია | დანიშნულება |
|-----------|--------|------------|
| React | 19 | UI ბიბლიოთეკა |
| Vite | 8 | Build ინსტრუმენტი / Dev Server |
| ESLint | 10 | კოდის ხარისხის შემოწმება |

---

*შექმნილია სასწავლო მიზნებისთვის.*