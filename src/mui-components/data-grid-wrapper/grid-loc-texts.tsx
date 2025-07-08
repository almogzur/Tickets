import { GridLocaleText } from "@mui/x-data-grid";


export const GRID_DEFAULT_HEBREW_TEXT: GridLocaleText = {
    // Root
    noRowsLabel: 'אין שורה',
    noResultsOverlayLabel: 'לא נמצאו תוצאות.',
    
    toolbarDensity: 'צפיפות',
    toolbarDensityLabel: 'צפיפות',
    toolbarDensityCompact: 'דחוס',
    toolbarDensityStandard: 'סטנדרטי',
    toolbarDensityComfortable: 'נוח',
  
    // Columns selector toolbar button text
    toolbarColumns: 'עמודות',
    toolbarColumnsLabel: 'בחר עמודות',
  
    // Filters toolbar button text
    toolbarFilters: 'מסננים',
    toolbarFiltersLabel: 'הצג מסננים',
    toolbarFiltersTooltipHide: 'הסתר מסננים',
    toolbarFiltersTooltipShow: 'הצג מסננים',
    toolbarFiltersTooltipActive: (count) =>
      count !== 1 ? `${count} מסננים פעילים` : `${count} מסנן פעיל`,
  
    // Quick filter toolbar field
    toolbarQuickFilterPlaceholder: 'חפש...',
    toolbarQuickFilterLabel: 'חיפוש',
    toolbarQuickFilterDeleteIconLabel: 'נקה',
  
  
    // Export selector toolbar button text
    toolbarExport: 'ייצוא',
    toolbarExportLabel: 'ייצוא',
    toolbarExportCSV: 'הורד כ-CSV',
    toolbarExportPrint: 'הדפס',
    toolbarExportExcel: 'הורד כ-Excel',
  
    // Columns management text
    columnsManagementSearchTitle: 'חפש',
    columnsManagementNoColumns: 'אין עמודות',
    columnsManagementShowHideAllText: 'הצג/הסתר הכל',
    columnsManagementReset: 'אפס',
    columnsManagementDeleteIconLabel: 'נקה',
  
    // Filter panel text
    filterPanelAddFilter: 'הוסף מסנן',
    filterPanelRemoveAll: 'הסר הכל',
    filterPanelDeleteIconLabel: 'מחק',
    filterPanelLogicOperator: 'אופרטור לוגי',
    filterPanelOperator: 'אופרטור',
    filterPanelOperatorAnd: 'וגם',
    filterPanelOperatorOr: 'או',
    filterPanelColumns: 'עמודות',
    filterPanelInputLabel: 'ערך',
    filterPanelInputPlaceholder: 'ערך מסנן',
  
    // Filter operators text
    filterOperatorContains: 'מכיל',
    filterOperatorDoesNotContain: 'לא מכיל',
    filterOperatorEquals: 'שווה ל',
    filterOperatorDoesNotEqual: 'לא שווה ל',
    filterOperatorStartsWith: 'מתחיל ב',
    filterOperatorEndsWith: 'מסתיים ב',
    filterOperatorIs: 'הוא',
    filterOperatorNot: 'אינו',
    filterOperatorAfter: 'אחרי',
    filterOperatorOnOrAfter: 'ביום או אחרי',
    filterOperatorBefore: 'לפני',
    filterOperatorOnOrBefore: 'ביום או לפני',
    filterOperatorIsEmpty: 'ריק',
    filterOperatorIsNotEmpty: 'אינו ריק',
    filterOperatorIsAnyOf: 'הוא אחד מ',
    'filterOperator=': 'שווה ל',
    'filterOperator!=': 'לא שווה ל',
    'filterOperator>': 'גדול מ',
    'filterOperator>=': 'גדול או שווה ל',
    'filterOperator<': 'קטן מ',
    'filterOperator<=': 'קטן או שווה ל',
  
    // Header filter operators text
    headerFilterOperatorContains: 'מכיל',
    headerFilterOperatorDoesNotContain: 'לא מכיל',
    headerFilterOperatorEquals: 'שווה ל',
    headerFilterOperatorDoesNotEqual: 'לא שווה ל',
    headerFilterOperatorStartsWith: 'מתחיל ב',
    headerFilterOperatorEndsWith: 'מסתיים ב',
    headerFilterOperatorIs: 'הוא',
    headerFilterOperatorNot: 'אינו',
    headerFilterOperatorAfter: 'אחרי',
    headerFilterOperatorOnOrAfter: 'ביום או אחרי',
    headerFilterOperatorBefore: 'לפני',
    headerFilterOperatorOnOrBefore: 'ביום או לפני',
    headerFilterOperatorIsEmpty: 'ריק',
    headerFilterOperatorIsNotEmpty: 'אינו ריק',
    headerFilterOperatorIsAnyOf: 'הוא אחד מ',
    'headerFilterOperator=': 'שווה ל',
    'headerFilterOperator!=': 'לא שווה ל',
    'headerFilterOperator>': 'גדול מ',
    'headerFilterOperator>=': 'גדול או שווה ל',
    'headerFilterOperator<': 'קטן מ',
    'headerFilterOperator<=': 'קטן או שווה ל',
  
    // Filter values text
    filterValueAny: 'כל ערך',
    filterValueTrue: 'כן',
    filterValueFalse: 'לא',
  
    // Column menu text
    columnMenuLabel: 'תפריט',
    columnMenuShowColumns: 'הצג עמודות',
    columnMenuManageColumns: 'נהל עמודות',
    columnMenuFilter: 'מסנן',
    columnMenuHideColumn: 'הסתר עמודה',
    columnMenuUnsort: 'בטל מיון',
    columnMenuSortAsc: 'מיין בסדר עולה',
    columnMenuSortDesc: 'מיין בסדר יורד',
  
    // Column header text
    columnHeaderFiltersTooltipActive: (count) =>
      count !== 1 ? `${count} מסננים פעילים` : `${count} מסנן פעיל`,
    columnHeaderFiltersLabel: 'הצג מסננים',
    columnHeaderSortIconLabel: 'מיין',
  
    // Rows selected footer text
    footerRowSelected: (count) =>
      count !== 1
        ? `${count.toLocaleString()} שורות נבחרו`
        : `${count.toLocaleString()} שורה נבחרה`,
  
    // Total row amount footer text
    footerTotalRows: 'סה"כ שורות:',
  
    // Total visible row amount footer text
    footerTotalVisibleRows: (visibleCount, totalCount) =>
      `${visibleCount.toLocaleString()} מתוך ${totalCount.toLocaleString()}`,
  
    // Checkbox selection text
    checkboxSelectionHeaderName: 'בחירת תיבות סימון',
    checkboxSelectionSelectAllRows: 'בחר את כל השורות',
    checkboxSelectionUnselectAllRows: 'בטל בחירה של כל השורות',
    checkboxSelectionSelectRow: 'בחר שורה',
    checkboxSelectionUnselectRow: 'בטל בחירת שורה',
  
    // Boolean cell text
    booleanCellTrueLabel: 'כן',
    booleanCellFalseLabel: 'לא',
  
    // Actions cell more text
    actionsCellMore: 'עוד',
  
    // Column pinning text
    pinToLeft: 'נעץ לשמאל',
    pinToRight: 'נעץ לימין',
    unpin: 'בטל נעיצה',
  
    // Tree Data
    treeDataGroupingHeaderName: 'קבוצה',
    treeDataExpand: 'הצג ילדים',
    treeDataCollapse: 'הסתר ילדים',
  
    // Grouping columns
    groupingColumnHeaderName: 'קבוצה',
    groupColumn: (name) => `קבץ לפי ${name}`,
    unGroupColumn: (name) => `בטל קיבוץ לפי ${name}`,
  
    // Master/detail
    detailPanelToggle: 'החלף תצוגת פרטים',
    expandDetailPanel: 'הרחב',
    collapseDetailPanel: 'כווץ',
  
    // Used core components translation keys
    MuiTablePagination: {},
  
    // Row reordering text
    rowReorderingHeaderName: 'שינוי סדר שורות',
  
    // Aggregation
    aggregationMenuItemHeader: 'אגרגציה',
    aggregationFunctionLabelSum: 'סכום',
    aggregationFunctionLabelAvg: 'ממוצע',
    aggregationFunctionLabelMin: 'מינימום',
    aggregationFunctionLabelMax: 'מקסימום',
    aggregationFunctionLabelSize: 'גודל',
  };