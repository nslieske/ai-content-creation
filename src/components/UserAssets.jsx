import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const UserAssets = ({ assets, onAddAsset }) => {
  const [newAsset, setNewAsset] = React.useState('');

  const handleAddAsset = () => {
    if (newAsset.trim()) {
      onAddAsset(newAsset.trim());
      setNewAsset('');
      toast.success("Asset added successfully!");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Assets</h2>
      <ul className="list-disc pl-5">
        {assets.map((asset, index) => (
          <li key={index}>{asset}</li>
        ))}
      </ul>
      <div className="flex space-x-2">
        <div className="flex-grow">
          <Label htmlFor="newAsset" className="sr-only">New Asset</Label>
          <Input
            id="newAsset"
            value={newAsset}
            onChange={(e) => setNewAsset(e.target.value)}
            placeholder="Enter new asset URL"
          />
        </div>
        <Button onClick={handleAddAsset}>Add Asset</Button>
      </div>
    </div>
  );
};

export default UserAssets;