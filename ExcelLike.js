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
        this.InitDataSate = null;

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
    // Methods to test the plugin
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

        var cpt = 1;
        this.options.headerList.forEach(function (headerText) {
            var th = document.createElement('th');
            th.innerHTML = '<span class="headertext">' + headerText + '</span><span class="headerspan"></span>';
            th.className = 'header_cell_' + cpt;
            InitEventHeader(th);
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

        this.InitDataSate = this.options.data;

        var row = 1;
        this.options.data.forEach(function (line) {
            local_row = document.createElement('tr');
            local_row.className = 'el-row' + row;
            cell_num = document.createElement('td');
            cell_num.innerHTML = row;
            cell_num.style.width = '25px';
            local_row.appendChild(cell_num);
            for (col = 0; col < line.length; col++) {
                local_cell = document.createElement('td');
                local_cell.innerHTML = line[col];
                local_cell.className = 'el-cell_line' + row + '_col' + (col + 1);
                local_row.appendChild(local_cell);
            }
            local_table.appendChild(local_row);
            row++;
        });

        this.divLines = local_table;
        this.divLinesWrapper.appendChild(this.divLines);

        container = document.getElementsByClassName(this.options.containerClassName);
        container[0].appendChild(this.divLinesWrapper);
    }

    function InitEventHeader(element) {
        element.addEventListener('click', function () {
            OrderTable(element.className);
        });
    }

    function OrderTable(className) {
        SetSortLabel(className);
    }

    function SetSortLabel(className) {
        span = document.getElementsByClassName(className)[0].getElementsByTagName('span')[1];
        if (span.innerHTML === '↑') {
            span.innerHTML = '↓';
            document.getElementsByClassName(className)[0].style.textDecoration = 'underline';
            document.getElementsByClassName(className)[0].style.backgroundImage = 'url("arrowdown.svg")';
        }
        else if (span.innerHTML === '↓') {
            span.innerHTML = '';
            document.getElementsByClassName(className)[0].style.textDecoration = 'none';
            document.getElementsByClassName(className)[0].style.backgroundImage = '';
        }
        else {
            span.innerHTML = '↑';
            document.getElementsByClassName(className)[0].style.textDecoration = 'underline';
            document.getElementsByClassName(className)[0].style.backgroundImage = 'url("arrowup.svg")';
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