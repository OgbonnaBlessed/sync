/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
  useFieldArray,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Edit, X, Plus } from "lucide-react";
import { registerPlugin } from "filepond"
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface FormFieldProps {
  name: string;
  label: string;
  type?:
    | "text"
    | "email"
    | "textarea"
    | "number"
    | "select"
    | "switch"
    | "password"
    | "file"
    | "multi-input";
  placeholder?: string;
  options?: { value: string; label: string }[];
  accept?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  value?: string;
  disabled?: boolean;
  multiple?: boolean;
  isIcon?: boolean;
  initialValue?: string | number | boolean | string[];
  imageValue?: string;
}

export const CustomFormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  options,
  className,
  inputClassName,
  labelClassName,
  disabled = false,
  multiple = false,
  isIcon = false,
  initialValue,
  imageValue
}) => {
    const { control, setValue, setError, clearErrors } = useFormContext();

    useEffect(() => {
        if (imageValue) {
            setValue(name, imageValue);
        }
    }, [imageValue, name, setValue]);

    const renderFormControl = (
        field: ControllerRenderProps<FieldValues, string>
    ) => {
        switch (type) {
            case "textarea":
                return (
                    <Textarea
                        placeholder={placeholder}
                        {...field}
                        rows={3}
                        className={`border-none bg-customgreys-darkGrey p-4 ${inputClassName}`}
                    />
                );
            case "select":
                return (
                    <Select
                        value={field.value || (initialValue as string)}
                        defaultValue={field.value || (initialValue as string)}
                        onValueChange={field.onChange}
                    >
                        <SelectTrigger className={`w-full border-none bg-customgreys-primarybg p-4 ${inputClassName}`}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className="w-full bg-customgreys-primarybg border-customgreys-dirtyGrey shadow">
                            {options?.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    className={`cursor-pointer text-white-50 hover:!bg-gray-100 hover:!text-customgreys-darkGrey`}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            case "switch":
                return (
                    <div className="flex items-center space-x-2">
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id={name}
                            className={`text-customgreys-dirtyGrey ${inputClassName}`}
                        />
                        <FormLabel htmlFor={name} className={labelClassName}>
                            {label}
                        </FormLabel>
                    </div>
                );
            case "file":
                return (
                    <div>
                        <FilePond
                            className={`${inputClassName}`}
                            files={field.value ? [{ source: field.value, options: { type: "local" } }] : []}
                            allowMultiple={multiple}
                            maxFiles={1}
                            onupdatefiles={(fileItems) => {
                                if (fileItems?.length > 0) {
                                    const file = fileItems[0]?.file;
                        
                                    if (!file || !(file instanceof Blob)) {
                                        console.error("Invalid file selected");
                                        return;
                                    }
                        
                                    // Check file type
                                    if (!file.type.startsWith("image/")) {
                                        setError(name, { type: "manual", message: "Only image files are allowed" });
                                        return;
                                    }
                        
                                    clearErrors(name); // Clear error if file is valid
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        field.onChange(reader.result as string); // Convert file to base64 string
                                    };
                                    reader.readAsDataURL(file);
                                } else {
                                    field.onChange(""); // Handle empty file case
                                }
                            }}
                            disabled={disabled}
                            acceptedFileTypes={["image/*"]}
                            labelIdle={`Drag & Drop your image or <span class="filepond--label-action">Browse</span>`}
                            credits={false}
                        />
                    </div>
                );
            case "number":
                return (
                    <Input
                        type="number"
                        placeholder={placeholder}
                        {...field}
                        className={`border-none bg-customgreys-darkGrey p-4 ${inputClassName}`}
                        disabled={disabled}
                    />
                );
            case "multi-input":
                return (
                    <MultiInputField
                        name={name}
                        control={control}
                        placeholder={placeholder}
                        inputClassName={inputClassName}
                    />
                );
            default:
                return (
                    <Input
                        type={type}
                        placeholder={placeholder}
                        {...field}
                        className={`border-none bg-customgreys-primarybg p-4 ${inputClassName}`}
                        disabled={disabled}
                    />
                );
        }
    };

    return (
        <FormField
            control={control}
            name={name}
            defaultValue={initialValue}
            render={({ field }) => (
                <FormItem
                    className={`${
                        type !== "switch" && "rounded-md"
                    } relative ${className}`}
                >
                    {type !== "switch" && (
                        <div className="flex justify-between items-center">
                        <FormLabel
                            className={`text-customgreys-dirtyGrey text-sm ${labelClassName}`}
                        >
                            {label}
                        </FormLabel>

                        {!disabled &&
                            isIcon &&
                            type !== "file" &&
                            type !== "multi-input" && (
                            <Edit className="size-4 text-customgreys-dirtyGrey" />
                            )}
                        </div>
                    )}
                    <FormControl>
                        {renderFormControl({
                            ...field,
                            value: field.value !== undefined ? field.value : initialValue,
                        })}
                    </FormControl>
                    <FormMessage className="text-red-400" />
                </FormItem>
            )}
        />
    );
};
interface MultiInputFieldProps {
  name: string;
  control: any;
  placeholder?: string;
  inputClassName?: string;
}

const MultiInputField: React.FC<MultiInputFieldProps> = ({
  name,
  control,
  placeholder,
  inputClassName,
}) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    return (
        <div className="space-y-2">
            {fields.map((field, index) => (
                <div key={field.id} className="flex items-center space-x-2">
                    <FormField
                        control={control}
                        name={`${name}.${index}`}
                        render={({ field }) => (
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder={placeholder}
                                    className={`flex-1 border-none bg-customgreys-darkGrey p-4 ${inputClassName}`}
                                />
                            </FormControl>
                        )}
                    />
                    <Button
                        type="button"
                        onClick={() => remove(index)}
                        variant="ghost"
                        size="icon"
                        className="text-customgreys-dirtyGrey"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            ))}
            <Button
                type="button"
                onClick={() => append("")}
                variant="outline"
                size="sm"
                className="mt-2 text-customgreys-dirtyGrey"
            >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
            </Button>
        </div>
    );
};