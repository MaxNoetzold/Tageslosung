<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_losung
 *
 * @copyright   Copyright (C) 2025 Max Nötzold. All rights reserved.
 * @license     ISC
 */

defined('_JEXEC') or die;

require_once __DIR__ . '/helper.php';

// Get module parameters
$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'), ENT_COMPAT, 'UTF-8');
$csvFolderPath = $params->get('csv_folder', 'modules/mod_losung/data');

$todaysBibleVerse = ModDailyBibleVerseHelper::getTodaysLosung($csvFolderPath);

// Include layout file
require JModuleHelper::getLayoutPath('mod_losung', $params->get('layout', 'default'));