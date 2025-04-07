
// Función para convertir datos a formato CSV
export const convertToCSV = (data: any[], columns: { key: string, label: string }[]): string => {
  // Cabecera
  const header = columns.map(col => col.label).join(',');
  
  // Filas
  const rows = data.map(item => {
    return columns.map(col => {
      const value = item[col.key];
      // Si el valor contiene comas, comillas o saltos de línea, encerrarlo en comillas
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value !== undefined && value !== null ? value : '';
    }).join(',');
  }).join('\n');
  
  return `${header}\n${rows}`;
};

// Función para descargar datos como archivo CSV
export const downloadCSV = (data: any[], columns: { key: string, label: string }[], filename: string): boolean => {
  try {
    const csvContent = convertToCSV(data, columns);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (error) {
    console.error('Error al descargar CSV:', error);
    return false;
  }
};

// Función para descargar datos como archivo Excel (XLSX)
export const downloadExcel = async (data: any[], columns: { key: string, label: string }[], filename: string): Promise<boolean> => {
  try {
    // Esta función simula la descarga de un archivo Excel
    // En una implementación real, se usaría una biblioteca como ExcelJS o XLSX
    // Para este ejemplo, simplemente convertimos a CSV con extensión .xlsx
    const csvContent = convertToCSV(data, columns);
    const blob = new Blob([csvContent], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.xlsx`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (error) {
    console.error('Error al descargar Excel:', error);
    return false;
  }
};

// Función para exportar datos como CSV o Excel
export const exportData = async (
  data: any[], 
  columns: { key: string, label: string }[], 
  type: "csv" | "excel", 
  filename: string
): Promise<boolean> => {
  if (type === "csv") {
    return downloadCSV(data, columns, filename);
  } else {
    return downloadExcel(data, columns, filename);
  }
};
