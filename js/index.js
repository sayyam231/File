function formatSizeUnits(bytes) {
    if (bytes >= 1099511627776) { bytes = (bytes / 1099511627776).toFixed(2) + " TB"; }
    else if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
    else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
    else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + " KB"; }
    else if (bytes > 1) { bytes = bytes + " bytes"; }
    else if (bytes == 1) { bytes = bytes + " byte"; }
    else { bytes = "0 bytes"; }
    return bytes;
}
function btn(e) {
    var dialog = document.getElementById(e);
    dialog.style.display = 'block';
};
function btndown(e) {
    var dialog = document.getElementById(e);
    dialog.style.display = 'none';
};
function createDiv(file) {
    var cell = document.getElementById(file.name + 'cell');
    var div = document.createElement('div');
    div.setAttribute('id',file.name + 'div');
    var ul = document.createElement('ul');
    ul.innerHTML = `<li><b>File Name - </b>${file.name.replace(/\.[^/.]+$/, "")}</li><li><b>File Type - </b>${file.type}</li><li><b>Size - </b>${formatSizeUnits(file.size)}</li><li><b>Date - </b>${file.lastModifiedDate.toLocaleDateString()}</li>`;
    div.appendChild(ul);
    cell.appendChild(div);


}
document.getElementById("filepicker").addEventListener("change", (event) => {
    let table = document.getElementById("listing");
    var arr = [];
    for (const file of event.target.files) {
        arr.push(file);
    }
    
    arr.sort((a, b) => /[^.]+$/.exec(a.name) > /[^.]+$/.exec(b.name) ? 1 : -1);
    for (const file of arr) {
        var row = table.insertRow();
        var cell = row.insertCell();
        var img = /[^.]+$/.exec(file.name);
        console.log(img[0]);
        var extention = ['png', 'jpg', 'htm','js','mp4','pdf','ppt','txt','zip','css'];
        if (!extention.includes(img[0])) {
            img = 'file'
        }
        cell.innerHTML = `<img src="images/${img}.png"> ${file.name.replace(/\.[^/.]+$/, "")}`;
        
        
        var cell = row.insertCell();
        var size = formatSizeUnits(file.size);
        cell.style.cssText = 'text-align:center;'
        cell.innerHTML = size;
        var cell = row.insertCell();
        cell.style.cssText = 'text-align:center;'
        var button = document.createElement('button');
        button.innerHTML = "<img src='images/info.png'>Info";
        cell.appendChild(button);
        cell.setAttribute('id', file.name+'cell');  
        button.setAttribute('id', file.name);  
        button.onmouseover = function () { btn(file.name+'div') };
        button.onmouseleave = function () { btndown(file.name+'div') };
        createDiv(file)
    };
}, false);
