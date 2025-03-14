
import { Permission, permissionLabels, useCart, CategoryData } from "@/contexts/CartContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PermissionSelectorProps {
  category: CategoryData;
  selectedPermissions: Permission[];
  onChange: (permissions: Permission[]) => void;
}

export default function PermissionSelector({ 
  category, 
  selectedPermissions, 
  onChange 
}: PermissionSelectorProps) {
  const { calculatePermissionImpact } = useCart();
  
  const handleTogglePermission = (permission: Permission) => {
    if (selectedPermissions.includes(permission)) {
      onChange(selectedPermissions.filter(p => p !== permission));
    } else {
      onChange([...selectedPermissions, permission]);
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-cyber text-cyber-neon mb-4">Permission Settings</h3>
      
      {Object.keys(permissionLabels).map((key) => {
        const permission = key as Permission;
        const isSelected = selectedPermissions.includes(permission);
        const impact = calculatePermissionImpact(category, permission);
        
        return (
          <div 
            key={permission}
            className="flex items-center justify-between p-3 glass-panel hover:bg-cyber-gray/30 transition-colors"
          >
            <div className="flex flex-col gap-1">
              <Label 
                htmlFor={`permission-${permission}`}
                className="font-cyber text-white cursor-pointer"
              >
                {permissionLabels[permission]}
              </Label>
              <div className="text-xs text-white/60">
                Impact: <span className="text-cyber-neon">{impact.toFixed(1)}%</span>
              </div>
            </div>
            
            <Switch
              id={`permission-${permission}`}
              checked={isSelected}
              onCheckedChange={() => handleTogglePermission(permission)}
              className="data-[state=checked]:bg-cyber-neon"
            />
          </div>
        );
      })}
    </div>
  );
}
