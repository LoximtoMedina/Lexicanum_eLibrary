import React, { useState } from 'react';
import { 
  FaTimes, 
  FaUserCircle, 
  FaEnvelope, 
  FaLock, 
  FaUser,
  FaHashtag, 
  FaCalendarAlt, 
  FaExclamationCircle, 
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus
} from 'react-icons/fa';
import './SidebarUsuario.css';

export default function SidebarUsuario({ isOpen, onClose, usuarioSesion, setUsuarioSesion }) {
  // Estado para alternar entre la vista de 'login' y 'registro' si no hay sesión
  const [modo, setModo] = useState('login'); // 'login' | 'registro'
  
  // Estados para los campos de los formularios
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');

  if (!isOpen) return null;

  // Intentamos obtener el usuario guardado si no viene por props
  const usuario = usuarioSesion || JSON.parse(localStorage.getItem('usuarioLexicanum'));

  // Manejar el submit del Inicio de Sesión
  const handleLogin = (e) => {
    e.preventDefault();
    // Ejemplo: Simulamos el inicio de sesión exitoso con la estructura del JSON de la BD
    const usuarioLogueado = {
      userId: 1,
      name: nombre || "Usuario Lexicanum",
      email: email,
      role: "user",
      penalization: 0,
      registrationDate: new Date().toISOString(),
      active: true
    };

    localStorage.setItem('usuarioLexicanum', JSON.stringify(usuarioLogueado));
    if (setUsuarioSesion) setUsuarioSesion(usuarioLogueado);
    alert("¡Sesión iniciada con éxito!");
  };

  // Manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('usuarioLexicanum');
    if (setUsuarioSesion) setUsuarioSesion(null);
    setEmail('');
    setPassword('');
  };

  // Formatear la fecha de registro
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
          /* ================= VISTA DE PERFIL (SI YA INICIÓ SESIÓN) ================= */
          <>
            <div className="lexi-sidebar__encabezado">
              <FaUserCircle className="lexi-sidebar__avatar" />
              <h2 className="lexi-sidebar__nombre">{usuario.name}</h2>
              <span className={`lexi-sidebar__rol ${usuario.role === 'admin' ? 'admin' : ''}`}>
                {usuario.role === 'admin' ? 'Administrador' : 'Usuario Lector'}
              </span>
            </div>

            <div className="lexi-sidebar__contenido">
              <div className="lexi-sidebar__item-info">
                <FaHashtag className="lexi-sidebar__icono" />
                <div>
                  <label>ID de Usuario</label>
                  <p>#{usuario.userId}</p>
                </div>
              </div>

              <div className="lexi-sidebar__item-info">
                <FaEnvelope className="lexi-sidebar__icono" />
                <div>
                  <label>Correo Electrónico</label>
                  <p>{usuario.email}</p>
                </div>
              </div>

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
                    {usuario.penalization > 0 
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
          /* ================= VISTA DE LOGIN / REGISTRO (SI NO HAY SESIÓN) ================= */
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

            <form onSubmit={handleLogin} className="lexi-sidebar__form">
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