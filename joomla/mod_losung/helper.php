<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_losung
 *
 * @copyright   Copyright (C) 2025 Max Nötzold. All rights reserved.
 * @license     ISC
 */

defined('_JEXEC') or die;

/**
 * Helper class for Random CSV module
 */
class ModDailyBibleVerseHelper
{
    /**
     * Gets today's Losung entry from the appropriate CSV file
     *
     * @param string $csvFolderPath Path to the CSV files directory
     * @return array|null Array containing today's Losung data or null if not found
     */
    public static function getTodaysLosung($csvFolderPath)
    {
        $date = new JDate();
        $currentYear = $date->format('Y');
        $todayString = $date->format('d.m.Y');
        
        $csvFileName = 'Losungen' . $currentYear . '.csv';
        $csvFilePath = JPATH_ROOT . '/' . $csvFolderPath . '/' . $csvFileName;
        
        // Initialize return variable
        $todaysEntry = null;
        
        if (file_exists($csvFilePath) && is_readable($csvFilePath)) {
            if (($handle = fopen($csvFilePath, "r")) !== false) {
                // If needed at some time one could make the delimiter configurable
                while (($data = fgetcsv($handle, 1000, "\t")) !== false) {
                    // In the csv we expect the date to be in the first column
                    if (isset($data[0]) && $data[0] === $todayString) {
                        $todaysEntry = $data;
                        break;
                    }
                }
                
                fclose($handle);
            }
        } else {
            JFactory::getApplication()->enqueueMessage(
                JText::sprintf('MOD_LOSUNG_FILE_ERROR_SPECIFIC', $csvFileName),
                'warning'
            );
        }
        
        return $todaysEntry;
    }
}