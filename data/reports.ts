import { Report } from '../types';

// The key for storing the reports database in localStorage.
const REPORTS_DB_KEY = 'oglasisrbija_reports_db';

/**
 * Retrieves the list of all reports from localStorage.
 * @returns An array of Report objects.
 */
const getAllReports = (): Report[] => {
  try {
    const reportsJson = localStorage.getItem(REPORTS_DB_KEY);
    return reportsJson ? (JSON.parse(reportsJson) as Report[]) : [];
  } catch (error) {
    console.error("Failed to parse reports from storage", error);
    return [];
  }
};

/**
 * Saves a list of reports to localStorage.
 * @param reports The array of Report objects to save.
 */
const saveAllReports = (reports: Report[]): void => {
  localStorage.setItem(REPORTS_DB_KEY, JSON.stringify(reports));
};

/**
 * Adds a new report for a listing to the database.
 * @param listingId The ID of the listing being reported.
 * @param reason The reason for the report.
 * @returns A promise that resolves when the report is saved.
 */
export const addReport = (listingId: string, reason: string): Promise<void> => {
  return new Promise((resolve) => {
    // Simulate network delay for a more realistic feel
    setTimeout(() => {
      const allReports = getAllReports();
      const newReport: Report = {
        id: `report-${Date.now()}`,
        listingId,
        reason,
        reportedAt: new Date().toISOString(),
      };
      const updatedReports = [...allReports, newReport];
      saveAllReports(updatedReports);
      console.log('New report saved:', newReport);
      resolve();
    }, 500);
  });
};