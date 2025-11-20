async function apiGET(path){const r=await fetch(path); return r.json();}
async function apiPOST(path, body){const r=await fetch(path,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)}); return r.json();}
async function render(){
  document.getElementById('pendingList').textContent='Loading...';
  const pend = await apiGET('/api/admin/pending');
  document.getElementById('pendingList').innerHTML = pend.map(u=>`<div><b>${u.username}</b> <button data-approve="${u._id}">Approve</button> <button data-deny="${u._id}">Deny</button></div>`).join('');
  document.querySelectorAll('[data-approve]').forEach(btn=>btn.onclick=async e=>{ await apiPOST('/api/admin/approve',{id:btn.dataset.approve}); render();});
  document.querySelectorAll('[data-deny]').forEach(btn=>btn.onclick=async e=>{ await apiPOST('/api/admin/deny',{id:btn.dataset.deny}); render();});
}
render();
