const messagesEl = document.getElementById('messages');
async function whoami(){const r=await fetch('/api/auth/whoami'); const j=await r.json(); document.getElementById('whoami').textContent = j.username ? 'You: '+j.username : 'Not logged in'; return j;}
whoami();
async function loadRecent(){ const r=await fetch('/api/chat/recent'); const j=await r.json(); messagesEl.innerHTML = j.map(m=>`<div class="msg"><b>${m.username}</b>: ${m.moderated? '<i>[removed]</i>': m.text}</div>`).join(''); messagesEl.scrollTop = messagesEl.scrollHeight;}
loadRecent();
document.getElementById('msgForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const input = document.getElementById('msgInput');
  const text = input.value.trim(); if(!text) return;
  const res = await fetch('/api/chat/send',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({channel:'observable-room',text})});
  const j = await res.json();
  if(!j.ok) alert(j.message||'Failed'); else { input.value=''; loadRecent(); }
});
