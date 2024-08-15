import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AIContentForm = ({ userAssets }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Content generated successfully!");
    // Here you would typically send the data to an API
  };

  const handleAssetSelect = (value) => {
    setValue('selectedAsset', value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="domain">Domain</Label>
        <Input
          id="domain"
          placeholder="e.g. example.com"
          {...register("domain", { required: "Domain is required" })}
        />
        {errors.domain && <p className="text-red-500 text-sm mt-1">{errors.domain.message}</p>}
      </div>

      <div>
        <Label htmlFor="urls">Context URLs (one per line)</Label>
        <Textarea
          id="urls"
          placeholder="https://example.com/page1&#10;https://example.com/page2&#10;https://example.com/page3&#10;https://example.com/page4"
          rows={4}
          {...register("urls", { required: "At least one URL is required" })}
        />
        {errors.urls && <p className="text-red-500 text-sm mt-1">{errors.urls.message}</p>}
      </div>

      <div>
        <Label htmlFor="prompt">Site Context Prompt</Label>
        <Textarea
          id="prompt"
          placeholder="Describe the context of your site..."
          rows={3}
          {...register("prompt", { required: "Context prompt is required" })}
        />
        {errors.prompt && <p className="text-red-500 text-sm mt-1">{errors.prompt.message}</p>}
      </div>

      <div>
        <Label>Content Type</Label>
        <RadioGroup defaultValue="censored" className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="censored" id="censored" {...register("contentType")} />
            <Label htmlFor="censored">Censored</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="uncensored" id="uncensored" {...register("contentType")} />
            <Label htmlFor="uncensored">Uncensored</Label>
          </div>
        </RadioGroup>
      </div>

      {userAssets.length > 0 && (
        <div>
          <Label htmlFor="selectedAsset">Select Asset</Label>
          <Select onValueChange={handleAssetSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select an asset" />
            </SelectTrigger>
            <SelectContent>
              {userAssets.map((asset, index) => (
                <SelectItem key={index} value={asset}>
                  {asset}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <Button type="submit" className="w-full">Generate Content</Button>
    </form>
  );
};

export default AIContentForm;