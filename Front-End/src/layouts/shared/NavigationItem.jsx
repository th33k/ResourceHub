import React, { useState } from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  styled,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const StyledListItemButton = styled(ListItemButton)(({ theme, depth = 0 }) => ({
  paddingLeft: theme.spacing(2 + depth * 2),
  borderRadius: '8px',
  margin: '4px 8px',
  '&.Mui-selected': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgba(63, 81, 181, 0.08)'
        : 'rgba(63, 81, 181, 0.16)',
  },
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgba(63, 81, 181, 0.04)'
        : 'rgba(63, 81, 181, 0.08)',
  },
}));

const NavigationItem = ({ item, isOpen, depth = 0, getIcon }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (item.children) {
      setOpen(!open);
    }
  };

  return (
    <>
      <StyledListItemButton
        selected={item.active}
        onClick={handleClick}
        sx={{ paddingLeft: 2 + depth * 2 }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>{getIcon(item.icon)}</ListItemIcon>
        {isOpen && (
          <>
            <ListItemText primary={item.title} />
            {item.children && (open ? <ExpandLess /> : <ExpandMore />)}
          </>
        )}
      </StyledListItemButton>

      {item.children && isOpen && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((childItem) => (
              <NavigationItem
                key={childItem.path}
                item={childItem}
                isOpen={isOpen}
                depth={depth + 1}
                getIcon={getIcon}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default NavigationItem;
