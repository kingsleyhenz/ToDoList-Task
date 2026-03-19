import React, { useState, useEffect, useRef } from "react";
import SideBar from "../Component/SideBar";
import axios from 'axios';
import '../Stylesheets/Todo.css';
import toast from 'react-hot-toast';
import Cookies from "universal-cookie";
import withAuth from "../Component/withAuth";
import { 
  TbPlus, 
  TbCalendar, 
  TbFlag, 
  TbBookmark, 
  TbCirclePlus, 
  TbTrash, 
  TbEdit,
  TbSettings,
  TbCheck,
  TbX,
  TbChevronDown
} from 'react-icons/tb';
import BASE_URL from "../apiConfig";

const Todo = () => {
  const [task, setTask] = useState({ 
    title: "", 
    description: "", 
    category: "", 
    status: "Incomplete", 
    priorityLevel: "Medium",
    progress: 0,
    startDate: "",
    endDate: "" 
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Custom Dropdown States
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAddInput, setShowAddInput] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [editingCat, setEditingCat] = useState(null); // { id, name }
  
  const dropdownRef = useRef(null);

  const fetchCategories = async () => {
    const cookie = new Cookies();
    const token = cookie.get("token");
    try {
      const { data } = await axios.get(`${BASE_URL}/task/categories`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.status === "success") {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchCategories();
      setLoading(false);
    };
    init();
    
    // Handle click outside to close dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setEditingCat(null);
        setShowAddInput(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: name === 'progress' ? parseInt(value) : value });
  };

  const addNewTask = async (event) => {
    event.preventDefault();
    if (!task.category) {
      toast.error("Please select a category");
      return;
    }
    const cookie = new Cookies();
    const token = cookie.get("token");
  
    try {
      const { data } = await axios.post(`${BASE_URL}/task/create`, task, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.status === "success") {
        toast.success('Task logged successfully');
        setTask({ 
          title: "", 
          description: "", 
          category: "", 
          status: "Incomplete", 
          priorityLevel: "Medium",
          progress: 0,
          startDate: "", 
          endDate: "" 
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error occurred');
    }
  };

  const handleAddCategory = async (e) => {
    if (e.key && e.key !== 'Enter') return;
    if (!newCatName.trim()) return;
    
    const cookie = new Cookies();
    const token = cookie.get("token");
    try {
      const { data } = await axios.post(`${BASE_URL}/task/category`, { name: newCatName }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.status === "success") {
        toast.success('Category added');
        setNewCatName("");
        setShowAddInput(false);
        await fetchCategories();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add');
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCat || !editingCat.name.trim()) return;
    const cookie = new Cookies();
    const token = cookie.get("token");
    try {
      const { data } = await axios.patch(`${BASE_URL}/task/category/${editingCat.id}`, { name: editingCat.name }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.status === "success") {
        toast.success('Category updated');
        setEditingCat(null);
        await fetchCategories();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  const handleDeleteCategory = async (id, e) => {
    e.stopPropagation();
    const cookie = new Cookies();
    const token = cookie.get("token");
    try {
      const { data } = await axios.delete(`${BASE_URL}/task/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.status === "success") {
        toast.success('Category removed');
        if (task.category === id) setTask({...task, category: ""});
        await fetchCategories();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  const getSelectedCatName = () => {
    const cat = categories.find(c => c._id === task.category);
    return cat ? cat.name : "Select Category";
  };

  return (
    <>
      {loading ? (
        <div className="loader-container">
           <div className="modern-spinner"></div>
        </div>
      ) : (
        <div className="todo-wrapper">
          <SideBar />
          <main className="todo-main">
            <header className="todo-header">
              <h1 className="page-title">
                <TbCirclePlus className="title-icon" />
                New Todo Entry
              </h1>
              <p className="page-subtitle">Align your work with the latest project standards</p>
            </header>

            <div className="task-form-container">
              <form className="task-form" onSubmit={addNewTask}>
                <div className="form-row">
                  <div className="form-group" style={{ flex: 1.5 }}>
                    <label htmlFor="title">
                      <TbBookmark className="label-icon" />
                      Task Title
                    </label>
                    <input 
                      type="text" 
                      id="title"
                      name="title" 
                      value={task.title} 
                      onChange={handleInputChange} 
                      className="form-input"
                      placeholder="High-level mission..."
                      required
                    />
                  </div>
                  
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>
                      <TbFlag className="label-icon" />
                      Category
                    </label>
                    <div className="custom-dropdown-container" ref={dropdownRef}>
                       <div 
                         className={`dropdown-trigger ${isDropdownOpen ? 'active' : ''}`}
                         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                       >
                         <span className="selected-value">{getSelectedCatName()}</span>
                         <TbChevronDown className={`chevron ${isDropdownOpen ? 'rotate' : ''}`} />
                       </div>

                       {isDropdownOpen && (
                         <div className="dropdown-menu">
                            <ul className="dropdown-options-list">
                               {categories.map((cat) => (
                                 <li 
                                   key={cat._id} 
                                   className={`dropdown-option ${task.category === cat._id ? 'selected' : ''}`}
                                   onClick={() => { setTask({...task, category: cat._id}); setIsDropdownOpen(false); }}
                                 >
                                    {editingCat?.id === cat._id ? (
                                      <input 
                                        className="inline-edit-input"
                                        value={editingCat.name}
                                        onChange={(e) => setEditingCat({...editingCat, name: e.target.value})}
                                        onBlur={(e) => { e.stopPropagation(); handleUpdateCategory(); }}
                                        onClick={(e) => e.stopPropagation()}
                                        autoFocus
                                      />
                                    ) : (
                                      <span className="opt-name">{cat.name}</span>
                                    )}
                                    
                                    <div className="opt-actions">
                                      {editingCat?.id === cat._id ? (
                                        <TbCheck onClick={(e) => { e.stopPropagation(); handleUpdateCategory(); }} className="opt-btn-sm success" />
                                      ) : (
                                        <TbEdit onClick={(e) => { e.stopPropagation(); setEditingCat({id: cat._id, name: cat.name}); }} className="opt-btn-sm" />
                                      )}
                                      <TbTrash onClick={(e) => handleDeleteCategory(cat._id, e)} className="opt-btn-sm danger" />
                                    </div>
                                 </li>
                               ))}
                               
                               {!showAddInput ? (
                                 <li className="dropdown-option add-new-opt" onClick={() => setShowAddInput(true)}>
                                    <TbPlus className="opt-plus-icon" />
                                    <span>Add New Category...</span>
                                 </li>
                               ) : (
                                 <li className="dropdown-add-mini-form" onClick={(e) => e.stopPropagation()}>
                                    <input 
                                      type="text" 
                                      placeholder="Category name..." 
                                      value={newCatName}
                                      onChange={(e) => setNewCatName(e.target.value)}
                                      onKeyDown={handleAddCategory}
                                      className="mini-add-input"
                                      autoFocus
                                    />
                                    <TbCheck className="mini-add-btn" onClick={handleAddCategory} />
                                    <TbX className="mini-add-btn cancel" onClick={() => setShowAddInput(false)} />
                                 </li>
                               )}
                            </ul>
                         </div>
                       )}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Task Description</label>
                  <textarea 
                    id="description"
                    name="description" 
                    value={task.description} 
                    onChange={handleInputChange} 
                    className="form-textarea"
                    placeholder="Break down the deliverables..."
                    rows="3"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="status">Current Status</label>
                    <select 
                      id="status"
                      name="status" 
                      value={task.status} 
                      onChange={handleInputChange} 
                      className="form-select"
                      required
                    >
                      <option value="Incomplete">Incomplete</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="priorityLevel">Priority Level</label>
                    <select 
                      id="priorityLevel"
                      name="priorityLevel" 
                      value={task.priorityLevel} 
                      onChange={handleInputChange} 
                      className="form-select"
                      required
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="startDate">
                      <TbCalendar className="label-icon" />
                      Activation Date
                    </label>
                    <input 
                      type="date" 
                      id="startDate"
                      name="startDate" 
                      value={task.startDate} 
                      onChange={handleInputChange} 
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="endDate">
                      <TbCalendar className="label-icon" />
                      Target Deadline
                    </label>
                    <input 
                      type="date" 
                      id="endDate"
                      name="endDate" 
                      value={task.endDate} 
                      onChange={handleInputChange} 
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-actions" style={{ marginTop: '1.5rem' }}>
                  <button type="submit" className="btn-primary" style={{ minWidth: '180px' }}>
                    <TbPlus style={{ fontSize: '1.2rem' }} />
                    Register Task
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default withAuth(Todo);