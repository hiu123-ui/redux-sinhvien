import { ADD_STUDENT, EDIT_STUDENT, DELETE_STUDENT, UPDATE_STUDENT } from './actions';

const initialState = {
  students: [
    { id: 1, name: 'Nguyễn Văn A', phone: '09381111111', email: 'nguyenvana@gmail.com' },
    { id: 2, name: 'Nguyễn Văn B', phone: '093822222322', email: 'nguyenvanb@gmail.com' },
  ],
  editingStudent: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    case EDIT_STUDENT:
      return {
        ...state,
        editingStudent: state.students.find(student => student.id === action.payload),
      };
    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(student => student.id !== action.payload),
        editingStudent: state.editingStudent?.id === action.payload ? null : state.editingStudent,
      };
    case UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.id ? action.payload : student
        ),
        editingStudent: null,
      };
    default:
      return state;
  }
};

export default studentReducer;