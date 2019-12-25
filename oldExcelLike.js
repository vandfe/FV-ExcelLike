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
        this.DataSorted = null;

        // Define option defaults
        var defaults = {
            headerList: [],
            tableId: ''
        }

        // Create options by extending defaults with the passed in arugments
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

        this.InitDataSate = this.options.data;
        this.DataSorted = this.options.data;

        createHeader.call(this);
        createLines.call(this);

    }

    // Public Methods
    // TODO


    // Private Methods

    function createHeader() {

        this.divHeaderWrapper = document.createElement('div');
        this.divHeaderWrapper.className = 'el-header-wrapper';

        local_table = document.createElement('table');
        local_row = document.createElement('tr');

        local_cell_number = document.createElement('th');
        local_cell_number.style.width = '25px';
        className = this.options.containerClassName;
        local_cell_number.addEventListener('click', function () { ResetSortLabel(className); });
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

        var row = 1;
        this.DataSorted.forEach(function (line) {
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
        column_index = className.substr(className.length - 1) - 1;
        direction = document.getElementsByClassName(className)[0].getElementsByTagName('span')[1].innerText;
        document.getElementsByClassName('el-lines-wrapper')[0].parentNode.removeChild(document.getElementsByClassName('el-lines-wrapper')[0]);
        createLines();
        OrderDataSet(column_index, direction);
    }

    function SetSortLabel(className) {
        span = document.getElementsByClassName(className)[0].getElementsByTagName('span')[1];
        if (span.innerHTML === 'ASC') {
            span.innerHTML = 'DESC';
            document.getElementsByClassName(className)[0].style.textDecoration = 'underline';
            document.getElementsByClassName(className)[0].style.backgroundImage = 'url("arrowdown.svg")';
        }
        else if (span.innerHTML === 'DESC') {
            span.innerHTML = '';
            document.getElementsByClassName(className)[0].style.textDecoration = 'none';
            document.getElementsByClassName(className)[0].style.backgroundImage = '';
        }
        else {
            span.innerHTML = 'ASC';
            document.getElementsByClassName(className)[0].style.textDecoration = 'underline';
            document.getElementsByClassName(className)[0].style.backgroundImage = 'url("arrowup.svg")';
        }
    }

    function OrderDataSet(column_index, direction) {

        if (direction === 'ASC') {

        }
        else if (direction === 'DESC') {

        }
        else {

        }

        console.log('here');
    }

    function ResetSortLabel() {
        ths = document.getElementsByTagName('th');
        for (let th of ths) {
            if (th.getElementsByTagName('span').length > 0)
                th.getElementsByTagName('span')[1].innerHTML = '';

            th.style.textDecoration = 'none';
            th.style.backgroundImage = '';
        };
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