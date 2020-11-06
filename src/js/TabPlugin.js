export class TabPlugin {
    constructor({ rootSelector, activeControlClass, firstActivCntrlID }) {
        this.refs = this._getRefs(rootSelector);
        this._bindEvents();
        this.activeControlClass = activeControlClass;
        this._startActiveSettings(firstActivCntrlID);
    }

    _startActiveSettings(firstActivCntrlID) {
        const arrContrl = this.refs.control.querySelectorAll('a');
        const startActivCntrlElem = arrContrl[firstActivCntrlID - 1];
        startActivCntrlElem.classList.add(this.activeControlClass);
        const startActivPaneID = startActivCntrlElem.getAttribute('href').slice(1);
        const startActivPaneElem = this.refs.pane.querySelector(`#${startActivPaneID}`);
        startActivPaneElem.classList.remove('visually-hidden')
    }

    _getRefs(root) {
        const refs = {};
        refs.control = document.querySelector(`${root} [data-controls]`);
        refs.pane = document.querySelector(`${root} [data-pane-list]`);
        return refs
    }

    _bindEvents() {
        this.refs.control.addEventListener('click', this._handlerTabsControl.bind(this))
    }

    _handlerTabsControl(event) {
        event.preventDefault();
        if (event.target.nodeName !== 'A') {
            return;
        }
        this._controlActive(event);
        this._paneActiv(event);
    }

    _controlActive(event) {
        const activeControlBtn = this.refs.control.querySelector(`.${this.activeControlClass}`);
        if (activeControlBtn) {
            activeControlBtn.classList.remove(this.activeControlClass)
        }
        event.target.classList.add(this.activeControlClass);
    }

    _paneActiv(event) {
        const paneActiveId = event.target.getAttribute('href').slice(1);
        const arrPane = this.refs.pane.querySelectorAll('.pane-item').forEach(elem => {
            if (!elem.classList.contains('visually-hidden')) {
                elem.classList.add('visually-hidden')
            }
        })
        const tabsActivate = this.refs.pane.querySelector(`#${paneActiveId}`);
        tabsActivate.classList.remove('visually-hidden')
    }
}
