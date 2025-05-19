<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_losung
 *
 * @copyright   Copyright (C) 2025 Max Nötzold. All rights reserved.
 * @license     ISC
 */

defined('_JEXEC') or die;
?>

<div class="losung-module<?php echo $moduleclass_sfx; ?>" id="losung">
    <?php if (!empty($todaysBibleVerse) && count($todaysBibleVerse) >= 5): ?>
         <div class="losung">
            <h5 class="losungshead"><?php echo JText::_('MOD_LOSUNG_HEADER_BEGIN'); ?> <?php echo htmlspecialchars($todaysBibleVerse[0]); ?></h5>
            <p class="losungstext"><?php echo htmlspecialchars($todaysBibleVerse[4]); ?></p>
            <p class="losungsvers"><?php echo htmlspecialchars($todaysBibleVerse[3]); ?></p>
        </div>
    <?php else: ?>
        <div class="losung-empty">
            <?php echo JText::_('MOD_LOSUNG_NO_DATA'); ?>
        </div>
    <?php endif; ?>
</div>