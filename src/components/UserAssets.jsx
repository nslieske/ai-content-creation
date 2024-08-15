import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const UserAssets = ({ onAssetSelect }) => {
  const [assets, setAssets] = useState([]);
  const [newAssetName, setNewAssetName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newAsset = {
        id: Date.now(),
        name: newAssetName || file.name,
        file: file,
        selected: false
      };
      setAssets([...assets, newAsset]);
      setNewAssetName('');
      toast.success("Asset uploaded successfully!");
    }
  };

  const toggleAssetSelection = (id) => {
    const updatedAssets = assets.map(asset =>
      asset.id === id ? { ...asset, selected: !asset.selected } : asset
    );
    setAssets(updatedAssets);
    onAssetSelect(updatedAssets.filter(asset => asset.selected));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">User Assets</h2>
      <div className="space-y-4">
        <div className="flex items-end space-x-4">
          <div className="flex-grow">
            <Label htmlFor="assetName">Asset Name</Label>
            <Input
              id="assetName"
              value={newAssetName}
              onChange={(e) => setNewAssetName(e.target.value)}
              placeholder="Enter asset name (optional)"
            />
          </div>
          <Input
            id="assetUpload"
            type="file"
            onChange={handleFileUpload}
            className="w-full"
          />
        </div>
      </div>
      <div className="space-y-2">
        {assets.map(asset => (
          <div key={asset.id} className="flex items-center space-x-2">
            <Checkbox
              id={`asset-${asset.id}`}
              checked={asset.selected}
              onCheckedChange={() => toggleAssetSelection(asset.id)}
            />
            <Label htmlFor={`asset-${asset.id}`}>{asset.name}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAssets;