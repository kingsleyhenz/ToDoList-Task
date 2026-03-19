import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import BASE_URL from '../apiConfig';
import '../Stylesheets/IntroProfessional.css'; // Reusing layout styles

const CreatePassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    if (!email) {
        navigate('/');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`${BASE_URL}/user/create-password`, {
                email,
                otp,
                newPassword
            });
            if (data.status === "success") {
                toast.success('Password created successfully. Please login.');
                navigate('/login');
            } else {
                toast.error(data.message || 'Action failed');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='intro-container'>
            <div className="intro-visual-side">
                <div className="visual-content">
                    <div className="intro-brand">
                        <div className="brand-dot">✓</div>
                        <h1>TickIt</h1>
                    </div>
                    <div className="hero-text">
                        <h2>Secure Your Account</h2>
                        <p>We've sent a verification code to <strong>{email}</strong>. Please enter the OTP and choose a strong password to complete your setup.</p>
                    </div>
                </div>
            </div>

            <div className="intro-form-side">
                <div className="form-wrapper">
                    <div className="form-header">
                        <h3>Verify & Set Password</h3>
                        <p>One more step to master your productivity.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="prof-form">
                        <div className="input-block">
                            <label htmlFor="otp">Verification Code (OTP)</label>
                            <input 
                                type="text" 
                                id="otp" 
                                placeholder="Enter 6-digit code" 
                                value={otp} 
                                onChange={(e) => setOtp(e.target.value)} 
                                className="prof-input"
                                required
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="password">New Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="••••••••" 
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                                className="prof-input"
                                required
                            />
                        </div>

                        <button type='submit' className="submit-btn" disabled={loading}>
                            {loading ? 'Processing...' : 'Complete Registration'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePassword;
