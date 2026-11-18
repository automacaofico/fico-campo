'use strict';
const CampoStore=(()=>{const dbName='fico-campo',storeName='coletas';let dbPromise;
function open(){return dbPromise||(dbPromise=new Promise((resolve,reject)=>{const r=indexedDB.open(dbName,1);r.onupgradeneeded=()=>r.result.createObjectStore(storeName,{keyPath:'id'});r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)}))}
async function perform(mode,fn){const db=await open();return new Promise((resolve,reject)=>{let result;const t=db.transaction(storeName,mode),s=t.objectStore(storeName);try{result=fn(s)}catch(err){reject(err);return}t.oncomplete=()=>resolve(result.result);t.onabort=()=>reject(t.error||new Error('Não foi possível salvar no aparelho.'));t.onerror=()=>reject(t.error)})}
return {put:x=>perform('readwrite',s=>s.put(x)),get:id=>perform('readonly',s=>s.get(id)),all:()=>perform('readonly',s=>s.getAll()),remove:id=>perform('readwrite',s=>s.delete(id))}})();
