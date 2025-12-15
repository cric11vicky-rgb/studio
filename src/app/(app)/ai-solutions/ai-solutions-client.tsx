
'use client';

import React, { useEffect, useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, BrainCircuit, Image as ImageIcon, X } from 'lucide-react';
import { getAIUpdate } from './actions';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

const initialState = {
  success: false,
  data: undefined,
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Getting Solution...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Get Solution
        </>
      )}
    </Button>
  );
}

export default function AISolutionsClient() {
  const [state, formAction] = useActionState(getAIUpdate, initialState);
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageDataUri, setImageDataUri] = useState<string>('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state, toast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setImagePreview(dataUri);
        setImageDataUri(dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageDataUri('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="text-center items-center">
            <BrainCircuit className="h-12 w-12 text-primary mb-2" />
            <CardTitle className="font-headline text-3xl">AI Tutor</CardTitle>
            <CardDescription className="max-w-2xl">
                Stuck on a problem? Type your question or upload a picture, and our AI will provide a step-by-step solution.
            </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4 max-w-4xl mx-auto">
            <Textarea
              name="question"
              placeholder="Type your question here..."
              className="min-h-[100px]"
            />
            <input type="hidden" name="imageDataUri" value={imageDataUri} />

            {imagePreview && (
                <div className="relative w-fit mx-auto border rounded-md p-2">
                    <Image src={imagePreview} alt="Question preview" width={200} height={200} className="rounded-md object-contain max-h-[200px]" />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={handleRemoveImage}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full md:w-auto">
                    <ImageIcon className="mr-2" />
                    Upload Image
                </Button>
                <Input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                />
               <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
          <CardHeader>
            <CardTitle className="font-headline">Solution</CardTitle>
            <CardDescription>
              The AI-generated solution will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px]">
            {useFormStatus().pending ? (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full p-8">
                <Loader2 className="h-12 w-12 mb-4 animate-spin" />
                <p className="font-semibold">Our AI is thinking...</p>
                <p>Please wait a moment.</p>
              </div>
            ) : state.data?.solution ? (
              <div
                className="prose prose-sm md:prose-base max-w-none"
                dangerouslySetInnerHTML={{ __html: state.data.solution.replace(/\n/g, '<br />') }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full p-8">
                <Sparkles className="h-12 w-12 mb-4" />
                <p>Your solution is waiting to be generated!</p>
              </div>
            )}
          </CardContent>
        </Card>
    </div>
  );
}
