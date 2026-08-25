/* Searchable Select2 dropdown for Decap CMS fields. */
const Select2Control = createClass({
  componentDidMount: function () {
    this.$select = window.jQuery(this.selectElement);
    this.$select.select2({
      width: '100%',
      placeholder: 'Pilih salah satu',
      language: {
        noResults: function () { return 'Pilihan tidak ditemukan'; },
        searching: function () { return 'Mencari...'; }
      }
    });
    this.$select.next('.select2').find('.select2-selection').attr('aria-label', this.props.field.get('label'));
    this.$select.val(this.props.value || '').trigger('change.select2');
    this.$select.on('change.mteSelect2', function () {
      this.props.onChange(this.$select.val());
    }.bind(this));
  },

  componentDidUpdate: function (previousProps) {
    if (previousProps.value !== this.props.value) {
      this.$select.val(this.props.value || '').trigger('change.select2');
    }
  },

  componentWillUnmount: function () {
    this.$select.off('.mteSelect2').select2('destroy');
  },

  render: function () {
    const options = this.props.field.get('options').toJS();
    const optionElements = options.map(function (option) {
      const item = typeof option === 'string' ? { label: option, value: option } : option;
      return h('option', { key: item.value, value: item.value }, item.label);
    });

    return h('select', {
      id: this.props.forID,
      className: this.props.classNameWrapper,
      defaultValue: this.props.value || '',
      ref: function (element) { this.selectElement = element; }.bind(this)
    }, [h('option', { key: 'placeholder', value: '' }, '')].concat(optionElements));
  }
});

CMS.registerWidget('select2', Select2Control);

/* Indonesian UI labels used by the MTE content team. */
CMS.registerLocale('id', {
  auth: {
    login: 'Masuk',
    loggingIn: 'Sedang masuk...',
    loginWithGitHub: 'Masuk dengan GitHub'
  },
  app: {
    header: {
      content: 'Konten',
      workflow: 'Alur kerja',
      media: 'Media',
      quickAdd: 'Tambah cepat'
    },
    notFoundPage: { header: 'Halaman tidak ditemukan' }
  },
  collection: {
    sidebar: {
      collections: 'Jenis konten',
      allCollections: 'Semua konten',
      searchAll: 'Cari artikel',
      searchIn: 'Cari di'
    },
    collectionTop: {
      sortBy: 'Urutkan',
      viewAs: 'Tampilan',
      viewAsList: 'Tampilan daftar',
      viewAsGrid: 'Tampilan kartu',
      newButton: '＋ %{collectionLabel}',
      newButtonAriaLabel: 'Buat %{collectionLabel} baru',
      ascending: 'A–Z',
      descending: 'Z–A',
      searchResults: 'Hasil pencarian “%{searchTerm}”',
      searchResultsInCollection: 'Hasil “%{searchTerm}” di %{collection}'
    },
    entries: {
      loadingEntries: 'Memuat artikel...',
      cachingEntries: 'Menyiapkan artikel...',
      longerLoading: 'Proses ini mungkin memerlukan beberapa saat',
      noEntries: 'Belum ada artikel'
    }
  },
  editor: {
    editorControl: {
      field: { optional: 'opsional', widgetLabel: 'kolom %{widgetLabel}' }
    },
    editorControlPane: {
      widget: { required: '%{fieldLabel} wajib diisi.' }
    },
    editor: {
      onLeavePage: 'Keluar dari halaman ini?',
      onPublishing: 'Terbitkan artikel ini?',
      onDeletePublishedEntry: 'Hapus artikel yang sudah terbit ini?',
      loadingEntry: 'Memuat artikel...'
    },
    editorInterface: {
      togglePreview: 'Tampilkan atau sembunyikan pratinjau',
      toggleScrollSync: 'Samakan posisi gulir'
    },
    editorToolbar: {
      publishing: 'Menerbitkan...',
      publish: 'Terbitkan',
      published: 'Sudah terbit',
      unpublish: 'Batalkan terbit',
      deletePublishedEntry: 'Hapus artikel',
      deleteEntry: 'Hapus artikel',
      saving: 'Menyimpan...',
      save: 'Simpan',
      backCollection: ' Menulis di %{collectionLabel}',
      unsavedChanges: 'Belum disimpan',
      changesSaved: 'Perubahan tersimpan'
    },
    editorWidgets: {
      markdown: {
        bold: 'Tebal',
        italic: 'Miring',
        strikethrough: 'Coret',
        code: 'Kode',
        link: 'Tautan',
        linkPrompt: 'Masukkan alamat tautan',
        headings: 'Judul bagian',
        quote: 'Kutipan',
        bulletedList: 'Daftar berpoin',
        numberedList: 'Daftar bernomor',
        addComponent: 'Tambah komponen',
        richText: 'Teks visual',
        markdown: 'Markdown'
      },
      image: {
        choose: 'Pilih gambar',
        chooseDifferent: 'Ganti gambar',
        addMore: 'Tambah gambar',
        remove: 'Hapus gambar'
      },
      datetime: {
        now: 'Hari ini',
        clear: 'Kosongkan',
        setToNow: 'Gunakan tanggal hari ini'
      },
      list: { add: 'Tambah %{item}' },
      object: { expand: 'Buka', collapse: 'Tutup' }
    }
  },
  mediaLibrary: {
    mediaLibraryCard: {
      copy: 'Salin',
      copyUrl: 'Salin URL',
      copyPath: 'Salin lokasi',
      copied: 'Tersalin'
    },
    mediaLibraryModal: {
      loading: 'Memuat...',
      close: 'Tutup',
      noResults: 'Tidak ada hasil.',
      noAssetsFound: 'Belum ada media.',
      mediaAssets: 'Pustaka media',
      search: 'Cari media...',
      uploading: 'Mengunggah...',
      upload: 'Unggah',
      download: 'Unduh',
      deleting: 'Menghapus...',
      deleteSelected: 'Hapus pilihan',
      chooseSelected: 'Gunakan pilihan'
    }
  },
  ui: {
    default: { goBackToSite: 'Kembali ke website' },
    settingsDropdown: {
      logOut: 'Keluar',
      account: 'Menu akun'
    },
    toast: {
      missingRequiredField: 'Masih ada kolom wajib yang belum diisi.',
      entrySaved: 'Artikel tersimpan',
      entryPublished: 'Artikel berhasil diterbitkan'
    }
  }
});

/* Live article preview. */

const ArticlePreview = createClass({
  render: function () {
    const entry = this.props.entry;
    const widgetFor = this.props.widgetFor;

    const title = entry.getIn(['data', 'title']) || 'Tambah Judul Artikel';
    const category = entry.getIn(['data', 'category']) || 'Rectifier Systems';
    const excerpt = entry.getIn(['data', 'excerpt']) || 'Ringkasan artikel akan muncul di sini...';
    const author = entry.getIn(['data', 'author']) || 'Tim Engineer MT Elektrik';
    const publishedAt = entry.getIn(['data', 'publishedAt']) || '25 Agustus 2026';
    const readTime = entry.getIn(['data', 'readTime']) || '5 menit baca';
    const image = entry.getIn(['data', 'image']) || '/images/rectifier/oil-cooled-rectifier.webp';
    const relatedProductTitle = entry.getIn(['data', 'relatedProductTitle']) || 'Oil Cooled SCR Rectifier';
    const faqs = entry.getIn(['data', 'faqs']);

    return h('div', { style: { padding: '32px 16px', backgroundColor: '#f0f0f0', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' } },
      // WordPress Paper Canvas Wrapper
      h('div', { style: { maxWidth: '820px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '40px' } },
        
        // Category Badge & Title Header
        h('div', { style: { marginBottom: '24px', borderBottom: '1px solid #f0f0f0', paddingBottom: '20px' } },
          h('span', { style: { display: 'inline-block', padding: '4px 12px', backgroundColor: '#f0f6fc', color: '#2271b1', border: '1px solid #c5d9ed', borderRadius: '4px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' } }, category),
          h('h1', { style: { fontSize: '32px', fontWeight: '800', color: '#1e1e1e', lineHeight: '1.25', marginBottom: '16px', letterSpacing: '-0.02em' } }, title),
          h('p', { style: { fontSize: '15px', color: '#50575e', fontWeight: '400', lineHeight: '1.6', marginBottom: '16px' } }, excerpt),
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#646970', fontWeight: '500' } },
            h('span', { style: { fontWeight: '600', color: '#1e1e1e' } }, '👤 ' + author),
            h('span', {}, '•'),
            h('span', {}, '📅 ' + publishedAt),
            h('span', {}, '•'),
            h('span', {}, '⏱️ ' + readTime)
          )
        ),

        // Featured Image
        h('div', { style: { position: 'relative', height: '280px', width: '100%', backgroundColor: '#f6f7f7', borderRadius: '4px', overflow: 'hidden', marginBottom: '28px', border: '1px solid #dcdcde' } },
          h('img', { src: image, alt: title, style: { width: '100%', height: '100%', objectFit: 'cover' } })
        ),

        // Article Body Content Box
        h('div', { style: { fontSize: '15px', color: '#2c3338', lineHeight: '1.75', marginBottom: '36px' } },
          widgetFor('body')
        ),

        // FAQ Section Preview (if any)
        faqs && faqs.size > 0 ? h('div', { style: { margin: '32px 0', backgroundColor: '#f6f7f7', border: '1px solid #dcdcde', borderRadius: '4px', padding: '24px' } },
          h('h3', { style: { fontSize: '16px', fontWeight: '700', color: '#1e1e1e', borderBottom: '1px solid #dcdcde', paddingBottom: '10px', marginBottom: '16px' } }, '❓ Tanya Jawab Teknis (FAQ Rich Snippet)'),
          faqs.map(function (faq, index) {
            const q = faq.get('question');
            const a = faq.get('answer');
            return h('div', { key: index, style: { backgroundColor: '#ffffff', padding: '16px', borderRadius: '4px', border: '1px solid #e0e0e0', fontSize: '13px', marginBottom: '12px' } },
              h('strong', { style: { display: 'block', color: '#1e1e1e', fontWeight: '700', marginBottom: '6px', fontSize: '14px' } }, q),
              h('p', { style: { color: '#50575e', margin: '0' } }, a)
            );
          })
        ) : null,

        // Related Product Banner
        h('div', { style: { margin: '28px 0', backgroundColor: '#1d2327', color: '#ffffff', borderRadius: '4px', padding: '24px', border: '1px solid #2c3338' } },
          h('span', { style: { color: '#72aee6', fontWeight: '700', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' } }, '🛡️ Dukungan Rekayasa MT Elektrik'),
          h('h4', { style: { fontSize: '18px', fontWeight: '700', color: '#ffffff', margin: '0 0 8px 0' } }, 'Konsultasi Spesifikasi ' + relatedProductTitle),
          h('p', { style: { fontSize: '13px', color: '#a7aaad', margin: '0 0 18px 0' } }, 'Sales Engineer PT Muara Teknik Elektrik siap membantu rekomendasi teknis pabrik Anda.'),
          h('div', { style: { display: 'flex', gap: '10px' } },
            h('span', { style: { padding: '10px 18px', backgroundColor: '#00a32a', color: '#ffffff', fontWeight: '700', fontSize: '13px', borderRadius: '4px', display: 'inline-block' } }, '💬 WhatsApp Sales Engineer'),
            h('span', { style: { padding: '10px 18px', backgroundColor: '#2c3338', color: '#ffffff', fontWeight: '700', fontSize: '13px', borderRadius: '4px', border: '1px solid #4f5459', display: 'inline-block' } }, 'Lihat Spesifikasi')
          )
        )
      )
    );
  }
});

// Register custom preview template
CMS.registerPreviewTemplate('articles', ArticlePreview);
