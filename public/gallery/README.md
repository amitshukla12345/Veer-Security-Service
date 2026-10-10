# Gallery Folder — Veer Security Force

Apni gallery ki photos yahan rakho. Har category ka alag subfolder hai.

## Folder Structure

```
public/
└── gallery/
    ├── security-personnel/    ← Guard, supervisor ki photos
    ├── corporate-security/    ← Office / corporate site photos
    ├── industrial-security/   ← Factory / warehouse photos
    ├── training/              ← Training / briefing photos
    └── events/                ← Event security photos
```

## Image Guidelines

- Format: JPG ya JPEG recommended (WebP bhi chalega)
- Size: 800x600px ya usse bada (4:3 ratio best hai gallery ke liye)
- File size: 500KB se kam rakho (faster loading ke liye)
- File name: lowercase, hyphen-separated rakho
  - Example: `security-guard-01.jpg`, `corporate-office-02.jpg`

## Gallery Component Update

Jab apni photos daal do, to `src/components/Gallery.jsx` mein
`ALL_ITEMS` array update karo. Example:

```js
{ 
  id: 1, 
  category: 'Security Personnel', 
  src: '/gallery/security-personnel/guard-01.jpg', 
  alt: 'Security guard at entrance' 
},
```

## Note
`public/` folder ki files directly root URL se accessible hoti hain.
Matlab `/gallery/security-personnel/guard-01.jpg` ka URL hoga:
`http://localhost:5173/gallery/security-personnel/guard-01.jpg`
