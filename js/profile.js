// js/profile.js

document.addEventListener('DOMContentLoaded', function() {
    // Mostrar datos del usuario logueado
    const user = JSON.parse(localStorage.getItem('dataflixLoggedUser'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    // Nombre completo
    const fullnameEl = document.getElementById('profile-fullname');
    if (fullnameEl) fullnameEl.textContent = user.fullname || user.fullName;
    // Username (usar parte del email antes de @)
    const usernameEl = document.getElementById('profile-username');
    if (usernameEl) usernameEl.textContent = (user.username || user.email.split('@')[0]);
    // Email
    const emailEl = document.getElementById('profile-email');
    if (emailEl) emailEl.textContent = user.email;

    // PROGRESO EN TIEMPO REAL
    const progressContent = document.getElementById('progress-content');
    let quizData = null;
    if (user && user.email) {
      const key = `quizData_${user.email}`;
      quizData = JSON.parse(localStorage.getItem(key) || 'null');
    }
    if (progressContent && quizData && quizData.answers && quizData.questions) {
        let totalQuestions = 0, totalCorrect = 0;
        let html = '<ul style="list-style:none; padding:0;">';
        quizData.questions.forEach((mod, idx) => {
            const userAns = quizData.answers[idx] || [];
            let correct = 0;
            if (mod.questions) {
              mod.questions.forEach((q, i) => {
                  if (userAns[i] === q.correct) correct++;
              });
              const percent = Math.round((correct / mod.questions.length) * 100);
              totalQuestions += mod.questions.length;
              totalCorrect += correct;
              html += `<li style='margin-bottom:12px;'><strong>${mod.title}:</strong> ${correct} / ${mod.questions.length} correctas (${percent}%)
                  <div style='background:#eee;width:100%;height:8px;border-radius:4px;overflow:hidden;margin-top:4px;'>
                      <div style='background:#4caf50;height:100%;width:${percent}%;'></div>
                  </div>
              </li>`;
            }
        });
        const globalPercent = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
        html += `<li style='margin-top:18px;'><strong>Progreso global:</strong> ${totalCorrect} / ${totalQuestions} correctas (${globalPercent}%)
            <div style='background:#eee;width:100%;height:10px;border-radius:5px;overflow:hidden;margin-top:4px;'>
                <div style='background:#2196f3;height:100%;width:${globalPercent}%;'></div>
            </div>
        </li>`;
        html += '</ul>';
        progressContent.innerHTML = html;
    } else if (progressContent) {
        progressContent.innerHTML = '<em>No hay progreso registrado aún. ¡Resuelve algún quiz!</em>';
    }

    // Logout directo y simple
    const logoutBtn = document.getElementById('logout-button');
    if (logoutBtn) {
        logoutBtn.onclick = function() {
            localStorage.removeItem('dataflixLoggedUser');
            localStorage.removeItem('dataflixIsLoggedIn');
            window.location.href = 'login.html';
        };
    }
}); 