import { Provider } from 'react-redux';
import store from './redux/store';
import StudentManagement from './components/StudentManagement';
import './App.css';
function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <h1>Student Management</h1>
        <StudentManagement />
      </div>
    </Provider>
  );
}

export default App;