class LayersSwitcher {
    constructor(blObject, olObject) {
        this.blObject = blObject || {};
        this.olObject = olObject || {};
    }

    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'layers-switcher mapboxgl-ctrl';
        this._initSwitcher();
        return this._container;
    }

    _initSwitcher() {
        let blIds = Object.keys(this.blObject);
        let olIds = Object.keys(this.olObject);

        let refreshBaseLayer = () => {
            let inputs = document.getElementsByClassName("baselayer-input");
            for (let input of inputs) {
                let layerId = input.dataset.layerId;
                let isChecked = input.checked;
                this._map.setLayoutProperty(layerId, 'visibility', isChecked ? 'visible' : 'none');
            }
        }

        // set up the corresponding toggle button for each layer
        let menu = document.createElement('div');
        menu.className = 'menu';
        this._container.appendChild(menu);
        menu.style.display = 'none';
        let btn = document.createElement('div');
        btn.className = 'layers-button';
        let icon = document.createElement('div');
        icon.className = 'layers-icon';
        btn.appendChild(icon);
        this._container.appendChild(btn);

        btn.onmouseenter = () => {
            btn.style.display = 'none';
            menu.style.display = 'block';
        }
        menu.onmouseleave = () => {
            btn.style.display = 'block';
            menu.style.display = 'none';
        }

        for (let blId of blIds) {
            let layerName = this.blObject[blId];
            let item = document.createElement('div');
            item.className = 'layer-item';
            let input = document.createElement('input');
            input.className = "baselayer-input";
            input.type = 'radio';
            input.name = 'baselayer';
            input.dataset.layerId = blId;
            input.checked = this._map.getLayoutProperty(blId, 'visibility') !== 'none';
            item.appendChild(input);
            let text = document.createElement('span');
            text.textContent = layerName;
            item.appendChild(text);
            menu.appendChild(item);
            input.onclick = () => {
                refreshBaseLayer();
            };
        }

        if (olIds) {
            let sep = document.createElement('hr');
            menu.appendChild(sep);
        }

        for (let olId of olIds) {
            let layerName = this.olObject[olId];
            let item = document.createElement('div');
            item.className = 'layer-item';
            let input = document.createElement('input');
            input.className = "overlay-input";
            input.type = 'checkbox';
            input.name = 'overlayer';
            input.dataset.layerId = olId;
            input.checked = this._map.getLayoutProperty(olId, 'visibility') === 'visible';
            item.appendChild(input);
            let text = document.createElement('span');
            text.textContent = layerName;
            item.appendChild(text);
            menu.appendChild(item);
            input.onclick = () => {
                this._map.setLayoutProperty(olId, 'visibility', input.checked ? 'visible' : 'none');
            };
        }
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}


export default LayersSwitcher;


