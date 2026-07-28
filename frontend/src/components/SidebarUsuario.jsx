import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Swal from 'sweetalert2'; 
import { 
  FaTimes, 
  FaUserCircle, 
  FaEnvelope, 
  FaLock, 
  FaUser, 
  FaCalendarAlt, 
  FaExclamationCircle, 
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus
} from 'react-icons/fa';
import api from '../services/api';
import './SidebarUsuario.css';

export default function SidebarUsuario({ isOpen, onClose, usuarioSesion, setUsuarioSesion }) {
  const [modo, setModo] = useState('login'); // 'login' | 'registro'
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const usuario = usuarioSesion || JSON.parse(localStorage.getItem('usuarioLexicanum'));

  // Manejar el submit del Inicio de Sesión / Registro
  const handleSubmitAuth = async (e) => {
    e.preventDefault();

    if (modo === 'registro') {
      try {
        await api.post('/user', {
          name: nombre,
          email: email,
          password: password
        });

        //  Alerta de Registro Exitoso
        Swal.fire({
          icon: 'success',
          title: '¡Cuenta creada!',
          text: 'Te has registrado con éxito en Lexicanum. Por favor, inicia sesión.',
          confirmButtonColor: '#1b3d2f',
          timer: 3500
        });

        setNombre('');
        setEmail('');
        setPassword('');
        setModo('login');
      } catch (error) {
        console.error('Error al registrarse:', error);

        // Alerta de Error en Registro
        Swal.fire({
          icon: 'error',
          title: 'Error al registrarse',
          text: error.response?.data?.message || 'Hubo un error al registrar el usuario. Inténtalo de nuevo.',
          confirmButtonColor: '#1b3d2f'
        });
      }
    } else {
      try {
        const response = await api.post('/user/login', {
          email: email,
          password: password
        });

        const usuarioLogueado = response.data;

        localStorage.setItem('token', usuarioLogueado.token);
        localStorage.setItem('usuarioLexicanum', JSON.stringify(usuarioLogueado.user));
        if (setUsuarioSesion) setUsuarioSesion(usuarioLogueado.user);
        
        onClose();
        navigate('/');

        //  Alerta / Notification Toast de Login Exitoso
        Swal.fire({
          icon: 'success',
          title: `¡Bienvenido/a, ${usuarioLogueado.user.name || 'Lector'}!`,
          text: 'Has iniciado sesión correctamente.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });

      } catch (error) {
        console.error('Error al iniciar sesión:', error);

        //  Alerta de Error en Login
        Swal.fire({
          icon: 'error',
          title: 'Error de Autenticación',
          text: 'Correo o contraseña incorrectos. Por favor, verifica tus datos.',
          confirmButtonColor: '#1b3d2f'
        });
      }
    }
  };

  // Manejar el cierre de sesión
  const handleLogout = () => {
    //  Confirmación de Cierre de Sesión
    Swal.fire({
      title: '¿Cerrar Sesión?',
      text: '¿Estás seguro de que deseas salir de tu cuenta?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#1b3d2f',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('usuarioLexicanum');
        localStorage.removeItem('token');
        if (setUsuarioSesion) setUsuarioSesion(null);
        setEmail('');
        setPassword('');
        onClose();
        navigate('/');

        Swal.fire({
          icon: 'info',
          title: 'Sesión finalizada',
          text: 'Has cerrado sesión con éxito.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500
        });
      }
    });
  };

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return '—';
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-HN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="lexi-sidebar-overlay" onClick={onClose}>
      <aside 
        className="lexi-sidebar" 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="lexi-sidebar__btn-cerrar" onClick={onClose} title="Cerrar">
          <FaTimes />
        </button>

        {usuario ? (
          /* ================= VISTA DE PERFIL ================= */
          <>
            <div className="lexi-sidebar__encabezado">
              <FaUserCircle className="lexi-sidebar__avatar" />
              <h2 className="lexi-sidebar__nombre">{usuario.name}</h2>
              <span className={`lexi-sidebar__rol ${usuario.role === 'employee' ? 'admin' : ''}`}>
                {usuario.role === 'employee' ? 'Empleado' : 'Usuario Lector'}
              </span>
            </div>

            <div className="lexi-sidebar__contenido">
              <div className="lexi-sidebar__item-info">
                <FaCalendarAlt className="lexi-sidebar__icono" />
                <div>
                  <label>Fecha de Registro</label>
                  <p>{formatearFecha(usuario.registrationDate)}</p>
                </div>
              </div>

              <div className="lexi-sidebar__item-info">
                <FaExclamationCircle className={`lexi-sidebar__icono ${usuario.penalization > 0 ? 'con-penalizacion' : ''}`} />
                <div>
                  <label>Estado / Penalización</label>
                  <p>
                    {usuario.penalization === -1
                      ? 'Usuario Baneado'
                      : usuario.penalization > 0
                      ? `${usuario.penalization} día(s) de penalización`
                      : 'Sin penalizaciones activas'}
                  </p>
                </div>
              </div>
            </div>

            <div className="lexi-sidebar__pie">
              <button className="lexi-sidebar__btn-logout" onClick={handleLogout}>
                <FaSignOutAlt /> Cerrar Sesión
              </button>
            </div>
          </>
        ) : (
          /* ================= VISTA DE LOGIN / REGISTRO ================= */
          <div className="lexi-sidebar__auth">
            <div className="lexi-sidebar__encabezado">
              <FaUserCircle className="lexi-sidebar__avatar" />
              <h2 className="lexi-sidebar__nombre">
                {modo === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </h2>
              <p className="lexi-sidebar__subtitulo">
                {modo === 'login' 
                  ? 'Accede a tu cuenta de Lexicanum' 
                  : 'Regístrate para solicitar préstamos'}
              </p>
            </div>

            <form onSubmit={handleSubmitAuth} className="lexi-sidebar__form">
              {modo === 'registro' && (
                <div className="lexi-sidebar__campo">
                  <label><FaUser /> Nombre Completo</label>
                  <input 
                    type="text" 
                    placeholder="Ej. Juan Pérez" 
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required 
                  />
                </div>
              )}

              <div className="lexi-sidebar__campo">
                <label><FaEnvelope /> Correo Electrónico</label>
                <input 
                  type="email" 
                  placeholder="correo@ejemplo.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              <div className="lexi-sidebar__campo">
                <label><FaLock /> Contraseña</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>

              <button type="submit" className="lexi-sidebar__btn-submit">
                {modo === 'login' ? (
                  <><FaSignInAlt /> Ingresar</>
                ) : (
                  <><FaUserPlus /> Registrarse</>
                )}
              </button>
            </form>

            <div className="lexi-sidebar__auth-toggle">
              {modo === 'login' ? (
                <p>
                  ¿No tienes una cuenta?{' '}
                  <button type="button" onClick={() => setModo('registro')}>
                    Regístrate aquí
                  </button>
                </p>
              ) : (
                <p>
                  ¿Ya tienes cuenta?{' '}
                  <button type="button" onClick={() => setModo('login')}>
                    Inicia Sesión
                  </button>
                </p>
              )}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}