"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
    name: z.string().min(1),
});



export const StoreModal = () => {
    const StoreModal = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) =>{
        console.log(values)        
    };

    return (
        <Modal 
          title="Create store"
          description="Add a new store to manage products and categories"
          isOpen={StoreModal.isOpen}
          onClose={StoreModal.onClose}
        >
            <div>
                <div className="py-2 pb-4 space-y-4">
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField 
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="type here" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="flex items-center justify-end pt-6 space-x-2">
                                <Button variant="outline" onClick={StoreModal.onClose} >Cancel</Button>
                                <Button type="submit">Submit</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};