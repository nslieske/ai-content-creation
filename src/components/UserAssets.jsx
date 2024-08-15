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
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAsset = {
          id: Date.now(),
          name: newAssetName || file.name,
          file: file,
          preview: e.target.result,
          selected: false
        };
        setAssets([...assets, newAsset]);
        setNewAssetName('');
        toast.success("Asset uploaded successfully!");
      };
      reader.readAsDataURL(file);
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
            accept="image/*,video/*,audio/*"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map(asset => (
          <div key={asset.id} className="border rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={`asset-${asset.id}`} className="font-medium">{asset.name}</Label>
              <Checkbox
                id={`asset-${asset.id}`}
                checked={asset.selected}
                onCheckedChange={() => toggleAssetSelection(asset.id)}
              />
            </div>
            {asset.file.type.startsWith('image/') && (
              <img src={asset.preview} alt={asset.name} className="w-full h-32 object-cover rounded" />
            )}
            {asset.file.type.startsWith('video/') && (
              <video src={asset.preview} className="w-full h-32 object-cover rounded" controls />
            )}
            {asset.file.type.startsWith('audio/') && (
              <audio src={asset.preview} className="w-full" controls />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAssets;