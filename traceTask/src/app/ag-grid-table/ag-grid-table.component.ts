import { Component } from '@angular/core';
import { ColDef, GridOptions, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid-table',
  templateUrl: './ag-grid-table.component.html',
  styleUrls: ['./ag-grid-table.component.css'],
})
export class AgGridTableComponent {
  showCheckboxes: boolean = false;
  gridApi!: GridApi;
  isEditModalVisible = false;
  isConfirmationVisible = false;
  isPanelOpen = false;
  hiddenColumns: string[] = [];
  selectedRowData: any = {};
  selectedRowsData: any[] = [];

  rowData = [
    {
      id: 997,
      ruleName: '2DS - Trace Changes',
      active: 'Y',
      type: 'Match',
      subType: '2DS - Trace Changes',
      domain: 'Data Security',
      impacted: 0,
      favourite: 'N',
      scheduled: 'Y',
      lastScheduledDate: '01-May-2024 01:15 PM',
      alert: 'Y',
    },
    {
      id: 996,
      ruleName: 'Trace Changes',
      active: 'Y',
      type: 'Match',
      subType: '2DS - Trace Changes',
      domain: 'Compliance',
      impacted: 0,
      favourite: 'N',
      scheduled: 'N',
      lastScheduledDate: '01-May-2024 01:15 PM',
      alert: 'N',
    },
    {
      id: 986,
      ruleName: 'File Monitor',
      active: 'Y',
      type: 'Match',
      subType: '1DS - File Monitor',
      domain: 'System Logs',
      impacted: 57994,
      favourite: 'N',
      scheduled: 'Y',
      lastScheduledDate: '01-May-2024 01:15 PM',
      alert: 'Y',
    },
    {
      id: 985,
      ruleName: 'testreve1',
      active: 'Y',
      type: 'Match',
      subType: '1DS - File Monitor',
      domain: 'Cloud Computing',
      impacted: 13773,
      favourite: 'N',
      scheduled: 'N',
      lastScheduledDate: '01-May-2024 01:15 PM',
      alert: 'N',
    },
  ];

  columnDefs: ColDef[] = this.getColumnDefs(false);

  gridOptions: GridOptions = {
    rowSelection: 'multiple',
    onGridReady: (params) => {
      this.gridApi = params.api;
    },
    onSelectionChanged: () => this.onSelectionChanged(),
  };

  getColumnDefs(showCheckboxes: boolean): ColDef[] {
    return [
      ...(showCheckboxes
        ? [
            {
              field: 'checkbox',
              headerCheckboxSelection: true,
              checkboxSelection: true,
              width: 50,
            },
          ]
        : []),
      {
        headerName: '',
        headerCheckboxSelection: false,
        checkboxSelection: false,
        width: 50,
        cellRenderer: (params: any) => {
          const div = document.createElement('div');
          div.style.display = 'flex';
          div.style.alignItems = 'center';
          const editIcon = document.createElement('i');
          editIcon.classList.add('edit-icon');
          editIcon.style.cursor = 'pointer';
          editIcon.style.marginRight = '8px';
          editIcon.style.color = 'blue';
          editIcon.title = 'Edit';
          editIcon.innerHTML = '&#9998;';
          editIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            this.onEditClick(params);
          });

          div.appendChild(editIcon);
          return div;
        },
      },
      {
        field: 'id',
        headerName: 'Rule ID',
        sortable: true,
        filter: true,
        resizable: true,
      },
      {
        field: 'ruleName',
        headerName: 'Rule Name',
        sortable: true,
        filter: true,
        resizable: true,
      },
      {
        field: 'active',
        headerName: 'Active Status',
        sortable: true,
        filter: true,
        resizable: true,
      },
      {
        field: 'type',
        headerName: 'Rule Type',
        sortable: true,
        filter: true,
        resizable: true,
      },
      {
        field: 'subType',
        headerName: 'Sub Type',
        sortable: true,
        filter: true,
        resizable: true,
      },
      {
        field: 'domain',
        headerName: 'Domain',
        sortable: true,
        filter: true,
        resizable: true,
      },
      {
        field: 'impacted',
        headerName: 'Impacted Records',
        sortable: true,
        filter: true,
        resizable: true,
      },
      {
        field: 'favourite',
        headerName: 'Favourite',
        sortable: true,
        filter: true,
        resizable: true,
      },
      {
        field: 'scheduled',
        headerName: 'Scheduled Status',
        sortable: true,
        filter: true,
        resizable: true,
      },
      {
        field: 'lastScheduledDate',
        headerName: 'Last Scheduled Date',
        sortable: true,
        filter: true,
        resizable: true,
      },
      {
        field: 'alert',
        headerName: 'Alert Status',
        sortable: true,
        filter: true,
        resizable: true,
      },
    ];
  }

  onEditClick(params: any) {
    this.selectedRowData = { ...params.data };
    this.isEditModalVisible = true;
  }

  onSaveEdit() {
    this.isConfirmationVisible = true;
    this.isEditModalVisible = false;
  }

  confirmSave() {
    if (this.selectedRowData.id !== undefined) {
      const rowIndex = this.rowData.findIndex(
        (row) => row.id === this.selectedRowData.id
      );
      if (rowIndex !== -1) {
        this.rowData[rowIndex] = { ...this.selectedRowData };

        this.gridApi.setRowData(this.rowData);
      }
    }
    console.log('Updated Row Data:', this.selectedRowData);
    this.isConfirmationVisible = false;
  }

  cancelSave() {
    this.isConfirmationVisible = false;
  }

  closeEditModal() {
    this.isEditModalVisible = false;
  }

  onSelectionChanged() {
    this.selectedRowsData = this.gridApi?.getSelectedRows() || [];
    const shouldShowCheckboxes = this.selectedRowsData.length > 0;
    if (shouldShowCheckboxes !== this.showCheckboxes) {
      this.showCheckboxes = shouldShowCheckboxes;
      const newColumnDefs = (this.getColumnDefs(this.showCheckboxes) || []).map(
        (col) => {
          if ('field' in col && typeof col.field === 'string') {
            return { ...col, hide: this.hiddenColumns.includes(col.field) };
          }
          return col;
        }
      );

      this.gridApi.setColumnDefs(newColumnDefs);
    }
  }

  clearSelection() {
    this.gridApi?.deselectAll();
    this.selectedRowsData = [];
    this.showCheckboxes = false;
    this.gridApi.setColumnDefs(this.getColumnDefs(false));
  }
  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
  }

  toggleColumn(field: string | undefined) {
    if (!field) return;
    if (this.hiddenColumns.includes(field)) {
      this.hiddenColumns = this.hiddenColumns.filter((col) => col !== field);
    } else {
      this.hiddenColumns.push(field);
    }
    const columnDefs = (this.gridApi.getColumnDefs() || []).map((col) => {
      if ('field' in col && col.field === field) {
        return { ...col, hide: this.hiddenColumns.includes(field) };
      }
      return col;
    });
    this.gridApi.setColumnDefs(columnDefs);
  }
}
