// Create an immediately invoked functional expression to wrap our code
(function () {
    // Define our constructor
    this.ExcelLike = function () {

        // Create global element references
        this.divHeaderWrapper = null;
        this.divHeader = null;
        this.divLinesWrapper = null;
        this.divLines = null;
        this.data = null;

        // Define option defaults
        var defaults = {
            headerList: [],
            containerClassName: ''
        }

        // Create options by extending defaults with the passed in arugments
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

    }

    // Public Methods

    ExcelLike.prototype.open = function () {
        // Build out our Modal
        buildOut.call(this);

        // Initialize our event listeners
        initializeEvents.call(this);

        /*
         * After adding elements to the DOM, use getComputedStyle
         * to force the browser to recalc and recognize the elements
         * that we just added. This is so that CSS animation has a start point
         */
        window.getComputedStyle(this.modal).height;

        /*
         * Add our open class and check if the modal is taller than the window
         * If so, our anchored class is also applied
         */
        this.modal.className = this.modal.className +
            (this.modal.offsetHeight > window.innerHeight ?
                " scotch-open scotch-anchored" : " scotch-open");
        this.overlay.className = this.overlay.className + " scotch-open";
    }

    ExcelLike.prototype.test = function () {
        createHeader.call(this);
        createLines.call(this);
    }

    // Private Methods

    function createHeader() {

        this.divHeaderWrapper = document.createElement('div');
        this.divHeaderWrapper.className = 'el-header-wrapper';

        local_table = document.createElement('table');
        local_row = document.createElement('tr');

        local_cell_number = document.createElement('th');
        local_cell_number.style.width = '25px';
        local_row.appendChild(local_cell_number);

        var cpt = 0;
        this.options.headerList.forEach(function (headerText) {
            var th = document.createElement('th');
            th.innerHTML = headerText;
            th.className = 'header_cell_' + cpt;
            local_row.appendChild(th);
            cpt++;
        });
        local_table.appendChild(local_row);

        this.divHeader = local_table;
        this.divHeaderWrapper.appendChild(this.divHeader);

        container = document.getElementsByClassName(this.options.containerClassName);
        container[0].appendChild(this.divHeaderWrapper);
    }

    function createLines() {

        this.divLinesWrapper = document.createElement('div');
        this.divLinesWrapper.className = 'el-lines-wrapper';

        local_table = document.createElement('table');

        var cpt = 0;
        this.options.data.forEach(function (line) {
            local_row = document.createElement('tr');
            cell_num = document.createElement('td');
            cell_num.innerHTML = cpt;
            cell_num.style.width = '25px';
            local_row.appendChild(cell_num);
            for (i = 0; i < line.length; i++) {
                local_cell = document.createElement('td');
                local_cell.innerHTML = line[i];
                local_row.appendChild(local_cell);
            }
            local_table.appendChild(local_row);
            cpt++;
        });

        this.divLines = local_table;
        this.divLinesWrapper.appendChild(this.divLines);

        container = document.getElementsByClassName(this.options.containerClassName);
        container[0].appendChild(this.divLinesWrapper);
    }

    function initializeEvents() {

        if (this.closeButton) {
            this.closeButton.addEventListener('click', this.close.bind(this));
        }

        if (this.overlay) {
            this.overlay.addEventListener('click', this.close.bind(this));
        }

    }

    // Utility method to extend defaults with user options
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }
}());