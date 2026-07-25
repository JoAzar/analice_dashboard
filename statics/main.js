async function loadProcesses() {
    const res = await fetch('/api/processes');
    const data = await res.json();
    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}

async function loadLogs() {
    const res = await fetch('/api/logs');
    const data = await res.json();
    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}

async function loadConnections() {
    const res = await fetch('/api/connections');
    const data = await res.json();
    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}

async function loadIp() {
    const res = await fetch('/api/ip');
    const data = await res.json();
    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}

async function loadDisk() {
    const res = await fetch('/api/disk');
    const data = await res.json();
    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}

/*
async function loadPorts() {
    const res = await fetch('/api/ports');
    const data = await res.json();
    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}
*/

async function loadPorts() {
    const res = await fetch('/api/ports');
    const data = await res.json();
    const output = document.getElementById("output");
    let html = `
        <table class="fondoBlanco letraNegra">
            <thead>
                <tr>
                    <th>Proceso</th>
                    <th>PID</th>
                    <th>Protocolo</th>
                    <th>Local</th>
                    <th>Remoto</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(p => {
        html += `
            <tr>
                <td>${p.process}</td>
                <td>${p.pid}</td>
                <td>${p.protocol}</td>
                <td>${p.localAddress}:${p.localPort}</td>
                <td>${p.peerAddress}:${p.peerPort}</td>
                <td>${p.state}</td>
            </tr>
        `;
    });

    html += `</tbody></table>`;

    output.innerHTML = html;
}

async function loadWho() {
    const res = await fetch('/api/who');
    const data = await res.json();
    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}

async function loadSystem() {
    const res = await fetch('/api/system');
    const data = await res.json();
    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}

async function loadclickJakingAnalizer() {
    const url = document.getElementById("url").value;
    const res = await fetch(`/api/clickJakingAnalizer?url=${encodeURIComponent(url)}`);
    const data = await res.json();
    const output = document.getElementById("output");
    output.innerText = JSON.stringify(data, null, 2);
    output.style.color = data.alerta ? "red" : "green";
    setTimeout(() => { output.style.color = "";}, 2000);
}

async function loadLsof() {
    const port = prompt("Ingresá el puerto:");
    const res = await fetch(`/api/lsof/port/${port}`);
    const data = await res.json();
    const output = document.getElementById("output");
    console.log(data);

    if(!data.data) {
        output.innerText = data.output || "Sin datos"; 
        return;
    }

    if(data.count === 0) {
        output.innerText = data.message;
        return;
    }

    let html = `
        <table class="tabla" border="1" cellpadding="5">
            <tr>
                <th>Proceso</th>
                <th>PID</th>
                <th>Usuario</th>
            </tr>
    `;

    data.data.forEach(p => {
        const state = getState(p.name);
        html += `
            <tr onclick="loadProcess(${p.pid})">
                <td>${p.process}</td>
                <td>${p.pid}</td>
                <td>${p.user}</td>
                <td>${state}</td>
            </tr>
        `;
    });

    html += `</table>`;

    output.innerHTML = html;
}

function getState(name) {
    const match = name.match(/\((.*?)\)/);
    return match ? match[1] : "UNKNOWN";
}

async function loadProcess(pid) {
    const res = await fetch(`/api/ps/process/${pid}`);
    const data = await res.json();
    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}

async function loadPs() {
    const pid = prompt("Ingresá el PID:");
    const res = await fetch(`/api/ps/process/${pid}`);
    const data = await res.json();
    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}

async function loadTulnp() {
    const res = await fetch('/api/tulnp/ports');
    const data = await res.json();
    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}