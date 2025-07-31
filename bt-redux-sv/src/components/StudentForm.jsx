import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, updateStudent } from '../redux/actions';

const StudentForm = () => {
  const dispatch = useDispatch();
  const editingStudent = useSelector(state => state.students.editingStudent);
  
  const [student, setStudent] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    if (editingStudent) {
      setStudent(editingStudent);
    } else {
      setStudent({
        id: '',
        name: '',
        phone: '',
        email: '',
      });
    }
  }, [editingStudent]);

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', phone: '', email: '' };

    if (!student.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!student.phone.trim()) {
      newErrors.phone = 'Phone is required';
      valid = false;
    } else if (!/^\d{10,11}$/.test(student.phone)) {
      newErrors.phone = 'Phone must be 10-11 digits';
      valid = false;
    }

    if (!student.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    if (editingStudent) {
      dispatch(updateStudent(student));
    } else {
      const newStudent = {
        ...student,
        id: Date.now(),
      };
      dispatch(addStudent(newStudent));
    }

    setStudent({
      id: '',
      name: '',
      phone: '',
      email: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <h2>{editingStudent ? 'Edit Student' : 'Add Student'}</h2>
      
      <div className="form-group">
        <label>Student Name</label>
        <input
          type="text"
          name="name"
          value={student.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>
      
      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={student.phone}
          onChange={handleChange}
          className={errors.phone ? 'error' : ''}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>
      
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
      
      <button type="submit" className="submit-btn">
        {editingStudent ? 'Cập nhật' : 'Thêm'}
      </button>
    </form>
  );
};

export default StudentForm;