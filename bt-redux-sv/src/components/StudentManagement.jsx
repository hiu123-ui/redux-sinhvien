import { useState } from 'react';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import SearchBar from './SearchBar';

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <StudentForm />
      <SearchBar onSearch={setSearchTerm} />
      <StudentList searchTerm={searchTerm} />
    </div>
  );
};

export default StudentManagement;